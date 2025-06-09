import { Request, Response } from "express";
import { createMovie, getMovieById, updateMovie, deleteMovie } from "../services/movie.service";
import { z } from "zod";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../utils/prisma";
import { parseOptionalInt } from "../utils/parseInt";
import { parseOptionalDate } from "../utils/parseDate";

const movieSchema = z.object({
  title: z.string(),
  description: z.string(),
  trailerUrl: z.string(),
  synopsis: z.string(),
  previewUrl: z.string(),
  language: z.string(),
  budget: z.number(),
  votes: z.number(),
  popularity: z.number(),
  revenue: z.number(),
  status: z.string(),
  duration: z.number(),
  launch: z.string(),
  grade: z.number(),
  genres: z.array(z.string()),
});

export async function create(req: AuthRequest, res: Response) {
  try {
    const data = movieSchema.parse(req.body);
    const movie = await createMovie({ ...data, userId: req.id! });
    res.status(201).json(movie);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }

    console.error("Erro ao criar filme:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

export async function list(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;

  const minDuration = parseOptionalInt(req.query.minDuration);
  const maxDuration = parseOptionalInt(req.query.maxDuration);
  const startDate = parseOptionalDate(req.query.startDate);
  const endDate = parseOptionalDate(req.query.endDate);

  let genres: string[] | undefined;
  if (req.query.genres) {
    if (Array.isArray(req.query.genres)) {
      genres = req.query.genres as string[];
    } else {
      genres = [(req.query.genres as string)];
    }
  }

  const search = req.query.search as string | undefined;

  try {
    const where: any = {};

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (minDuration !== undefined || maxDuration !== undefined) {
      where.duration = {};
      if (minDuration !== undefined) {
        where.duration.gte = minDuration;
      }
      if (maxDuration !== undefined) {
        where.duration.lte = maxDuration;
      }
    }

    where.launch = {};
    if (startDate !== undefined) {
      where.launch.gte = startDate.toISOString();
    }
    if (endDate !== undefined) {
      where.launch.lte = endDate.toISOString();
    }

    if (genres && genres.length > 0) {
      where.genres = {
        hasSome: genres,
      };
    }

    const totalCount = await prisma.movie.count({
      where
    });


    const totalPages = Math.ceil(totalCount / pageSize);

    const movies = await prisma.movie.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        launch: 'desc',
      },
      select: {
        id: true,
        title: true,
        previewUrl: true,
        genres: true,
        grade: true,
      },
    });

    res.json({movies, totalPages, totalCount, currentPage: page});
  } catch (err) {
    console.error("Erro ao listar filmes:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

export async function get(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const movie = await getMovieById(id);

    if (!movie) return res.status(404).json({ error: "Filme não encontrado." });

    res.json(movie);
  } catch (err) {
    console.error("Erro ao buscar filme:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

export async function update(req: AuthRequest, res: Response) {
  const { id } = req.params;

  try {
    const data = movieSchema.partial().parse(req.body);

    const movie = await getMovieById(id);

    if (!movie) return res.status(404).json({ error: "Filme não encontrado." });

    if (movie.userId !== req.id) {
      return res.status(403).json({ error: "Você não tem permissão para editar este filme." });
    }

    const updatedMovie = await updateMovie(id, data);
    res.json(updatedMovie);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }

    console.error("Erro ao atualizar filme:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  const { id } = req.params;

  try {
    const movie = await getMovieById(id);

    if (!movie) return res.status(404).json({ error: "Filme não encontrado." });

    if (movie.userId !== req.id) {
      return res.status(403).json({ error: "Você não tem permissão para deletar este filme." });
    }

    await deleteMovie(id);
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao deletar filme:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}
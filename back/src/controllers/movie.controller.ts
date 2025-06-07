import { Request, Response } from "express";
import { createMovie, getMoviesPaginated, getMovieById, updateMovie, deleteMovie } from "../services/movie.service";
import { z } from "zod";

// Schema de validação do Movie
const movieSchema = z.object({
  title: z.string(),
  description: z.string(),
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

export async function create(req: Request, res: Response) {
  try {
    const data = movieSchema.parse(req.body);
    const movie = await createMovie(data);
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

  const minDuration = req.query.minDuration ? parseInt(req.query.minDuration as string) : undefined;
  const maxDuration = req.query.maxDuration ? parseInt(req.query.maxDuration as string) : undefined;
  const startDate = req.query.startDate as string;
  const endDate = req.query.endDate as string;

  try {
    const movies = await getMoviesPaginated(page, pageSize, {
      minDuration,
      maxDuration,
      startDate,
      endDate,
    });

    res.json(movies);
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

export async function update(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const data = movieSchema.partial().parse(req.body); // partial() permite edição parcial
    const movie = await updateMovie(id, data);

    if (!movie) return res.status(404).json({ error: "Filme não encontrado para atualizar." });

    res.json(movie);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.errors });
    }

    console.error("Erro ao atualizar filme:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await deleteMovie(id);
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao deletar filme:", err);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}
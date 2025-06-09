import { prisma } from "../utils/prisma";

export async function createMovie(data: any) {
  return prisma.movie.create({
    data,
  });
}

export async function getMoviesPaginated(
  page: number,
  pageSize: number,
  filters: {
    search?: string;
    minDuration?: number;
    maxDuration?: number;
    startDate?: string;
    endDate?: string;
  }
) {
  const skip = (page - 1) * pageSize;

  const where: any = {};

  if (filters.search) {
    where.title = {
      contains: filters.search,
      mode: "insensitive",
    };
  }

  if (filters.minDuration !== undefined) {
    where.duration = { gte: filters.minDuration };
  }

  if (filters.maxDuration !== undefined) {
    where.duration = { ...where.duration, lte: filters.maxDuration };
  }

  if (filters.startDate) {
    where.launch = { gte: new Date(filters.startDate) };
  }

  if (filters.endDate) {
    where.launch = {
      ...where.launch,
      lte: new Date(filters.endDate),
    };
  }

  const movies = await prisma.movie.findMany({
    skip,
    take: pageSize,
    where,
    orderBy: { launch: "desc" },
    select: {
      id: true,
      title: true,
      grade: true,
      genres: true,
      previewUrl: true,
    },
  });

  return movies;
}

export async function getMovieById(id: string) {
  return prisma.movie.findUnique({
    where: { id },
  });
}

export async function updateMovie(id: string, data: any) {
  try {
    return await prisma.movie.update({
      where: { id },
      data,
    });
  } catch (e) {
    console.error(e)
    return null;
  }
}

export async function deleteMovie(id: string) {
  return prisma.movie.delete({
    where: { id },
  });
}
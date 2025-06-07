import { prisma } from "../utils/prisma";

export async function createMovie(data: any) {
  return prisma.movie.create({ data });
}

export async function getMoviesPaginated(
  page: number,
  pageSize: number,
  filters: {
    minDuration?: number;
    maxDuration?: number;
    startDate?: string;
    endDate?: string;
  }
) {
  const where: any = {};

  if (filters.minDuration !== undefined) {
    where.duration = { gte: filters.minDuration };
  }

  if (filters.maxDuration !== undefined) {
    where.duration = {
      ...(where.duration ?? {}),
      lte: filters.maxDuration,
    };
  }

  if (filters.startDate && filters.endDate) {
    where.launch = {
      gte: new Date(filters.startDate),
      lte: new Date(filters.endDate),
    };
  }

  const skip = (page - 1) * pageSize;

  return prisma.movie.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: {
      launch: "desc",
    },
  });
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
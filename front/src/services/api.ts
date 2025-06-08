import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api';
const token = localStorage.getItem("token");

export async function registerUser(name: string, email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });

  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
}

export async function registerMovie(data: {
  title: string,
  description: string,
  synopsis: string,
  previewUrl: string,
  language: string,
  budget: number,
  votes: number,
  popularity: number,
  revenue: number,
  status: string,
  duration: number,
  launch: string,
  genres: Array<string>,
  trailerUrl: string,
  grade: number
}) {
  const response = await axios.post(`${API_URL}/movies`, {
    ...data
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

export const getMoviesPaginated = async (params: {
  page?: number;
  pageSize?: number;
  minDuration?: number;
  maxDuration?: number;
  startDate?: string;
  endDate?: string;
}) => {
  const response = await axios.get(`${API_URL}/movies`, {
    params, headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
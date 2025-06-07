import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api';

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
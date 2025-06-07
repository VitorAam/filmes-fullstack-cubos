import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            throw new Error(error.response.data.message ?? 'Erro ao fazer login.');
        }
        throw new Error('Erro de conexão com o servidor.');
    }
};
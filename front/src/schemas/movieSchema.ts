import { z } from 'zod';

export const movieSchema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  synopsis: z.string().min(1, 'Sinopse obrigatória'),
  previewUrl: z.string().url('URL inválida'),
  language: z.string().min(1, 'Idioma obrigatório'),
  budget: z.string().min(1, 'Orçamento obrigatório'),
  votes: z.string().min(1, 'Votos obrigatório'),
  popularity: z.string().min(1, 'Popularidade obrigatória'),
  revenue: z.string().min(1, 'Receita obrigatória'),
  status: z.string().min(1, 'Status obrigatório'),
  duration: z.string().min(1, 'Duração obrigatória'),
  launch: z.string().min(1, 'Data de lançamento obrigatória'),
  genres: z.array(z.string()).min(1, "Selecione pelo menos um gênero"),
  trailerUrl: z.string().url("URL do trailer inválida"),
  grade: z
    .string()
    .min(1, 'Nota obrigatória')
    .refine(val => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, 'Nota deve ser um número entre 0 e 100'),
});

export type MovieFormData = z.infer<typeof movieSchema>;
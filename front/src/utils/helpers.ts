import type { MovieFormData } from "../schemas/movieSchema";
import type { MovieDetails } from "../types/movie";

export function movieDetailsToFormData(movie: MovieDetails): MovieFormData {
    const { ...formData } = movie;
    return formData;
}
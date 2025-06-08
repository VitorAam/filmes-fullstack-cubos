export interface MovieCardSummary {
    id: string;
    title: string;
    grade: number;
    genres: string[];
    previewUrl: string;
}

export interface MovieDetails {
    id: string;
    title: string;
    description: string;
    synopsis: string;
    previewUrl: string;
    trailerUrl: string;
    language: string;
    budget: number;
    votes: number;
    popularity: number;
    revenue: number;
    status: string;
    duration: number;
    launch: string;
    grade: number;
    genres: string[];
}
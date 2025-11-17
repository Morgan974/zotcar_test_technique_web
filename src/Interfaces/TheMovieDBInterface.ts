export interface TheMovieDBMovie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    original_title: string;
    original_language: string;
    adult: boolean;
    video: boolean;
    genre_ids: number[];
}

export interface TheMovieDBCredits {
    cast: Array<{
        id: number;
        name: string;
        character: string;
        order: number;
    }>;
    crew: Array<{
        id: number;
        name: string;
        job: string;
        department: string;
    }>;
}

export interface TheMovieDBSearchResponse {
    page: number;
    results: TheMovieDBMovie[];
    total_pages: number;
    total_results: number;
}


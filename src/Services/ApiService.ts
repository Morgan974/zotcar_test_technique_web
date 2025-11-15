import { MovieInterface } from "../Interfaces/MovieInterface";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_URL}/api/watched-movies`;
    }

    async getAllWatchedMovies(
        sortBy: string = 'title',
        order: 'asc' | 'desc' = 'asc',
        filters?: { 
            title?: string; 
            director?: string; 
            releaseDate?: string
        }
    ): Promise<MovieInterface[]> {
        try {
            const params = new URLSearchParams({
                sortBy,
                order,
            });
    
            if (filters) {
                if (filters.title) {
                    params.append('title', filters.title);
                }
                if (filters.director) {
                    params.append('director', filters.director);
                }
                if (filters.releaseDate) {
                    params.append('releaseDate', filters.releaseDate);
                }
            }
    
            const response = await fetch(`${this.baseUrl}?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
            }
    
            const data: MovieInterface[] = await response.json();
            return data;
        } catch (error: unknown) {
            console.error('Erreur lors de la récupération des films déjà vus:', error);
            throw error;
        }
    }

    async addWatchedMovie(movie: MovieInterface): Promise<MovieInterface> {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: movie.id,
                    title: movie.title,
                    director: movie.director,
                    releaseDate: movie.releaseDate
                }),
            });
    
            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('Ce film est déjà dans la liste des "déjà vus"');
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Erreur HTTP: ${response.status}`);
            }
    
            const data: MovieInterface = await response.json();
            return data;
        } catch (error: unknown) {
            console.error('Erreur lors de l\'ajout du film:', error);
            throw error;
        }
    }

    async removeWatchedMovie(idMovie: string): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/${idMovie}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Film non trouvé');
                }
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
        } catch (error: unknown) {
            console.error('Erreur lors de la suppression du film:', error);
            throw error;
        }
    }

    async getWatchedMovie(idMovie: string): Promise<MovieInterface> {
        try {
            const response = await fetch(`${this.baseUrl}/${idMovie}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Film non trouvé');
                }
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
    
            const data: MovieInterface = await response.json();
            return data;
        } catch (error: unknown) {
            console.error('Erreur lors de la récupération du film:', error);
            throw error;
        }
    }
}

export const apiService = new ApiService();
import { TheMovieDBSearchResponse, TheMovieDBCredits, TheMovieDBMovie } from '../Interfaces/TheMovieDBInterface';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTI2Y2M3MzQ0NzAwNGE4ZTEzYTRiODViYWNiZmRkZCIsIm5iZiI6MTc2MzEwNjA0Ni4yMiwic3ViIjoiNjkxNmRjZmUwMzQ5ODJiYTA5NDBlNmFiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.t4TBVVnrak5OthB84y7wWeYr5Xc-FQywfUo5eBtW2hg';

class TheMovieDBService {
    async getMovie(idMovie: number): Promise<TheMovieDBMovie> {
        try {
            const url = TMDB_API_BASE_URL + '/movie/' + idMovie;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + TMDB_ACCESS_TOKEN,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur HTTP: ' + response.status);
            }

            const data: TheMovieDBMovie = await response.json();
            return data;
        } catch (error: unknown) {
            console.error('Erreur lors de la récupération du film depuis TheMovieDB:', error);
            throw error;
        }
    }

    async searchMovies(query: string, page: number = 1, year?: string): Promise<TheMovieDBSearchResponse> {
        try {
            const params = new URLSearchParams({
                query: query,
                page: page.toString(),
            });
            if (year) {
                params.append('year', year);
            }
            const url = TMDB_API_BASE_URL + '/search/movie?' + params.toString();
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + TMDB_ACCESS_TOKEN,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur HTTP: ' + response.status);
            }

            const data: TheMovieDBSearchResponse = await response.json();
            return data;
        } catch (error: unknown) {
            console.error('Erreur lors de la recherche de films depuis TheMovieDB:', error);
            throw error;
        }
    }

    async getMovieCredits(idMovie: number): Promise<TheMovieDBCredits> {
        try {
            const url = TMDB_API_BASE_URL + '/movie/' + idMovie + '/credits';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + TMDB_ACCESS_TOKEN,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur HTTP: ' + response.status);
            }

            const data: TheMovieDBCredits = await response.json();
            return data;
        } catch (error: unknown) {
            console.error('Erreur lors de la récupération des crédits depuis TheMovieDB:', error);
            throw error;
        }
    }

    async getPopularMovies(page: number = 1, year?: string): Promise<TheMovieDBSearchResponse> {
        try {
            let url: string;
            
            if (year) {
                const params = new URLSearchParams({
                    page: page.toString(),
                    sort_by: 'popularity.desc',
                    primary_release_year: year,
                });
                url = TMDB_API_BASE_URL + '/discover/movie?' + params.toString();
            } else {
                const params = new URLSearchParams({
                    page: page.toString(),
                });
                url = TMDB_API_BASE_URL + '/movie/popular?' + params.toString();
            }
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + TMDB_ACCESS_TOKEN,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur HTTP: ' + response.status);
            }

            const data: TheMovieDBSearchResponse = await response.json();
            return data;
        } catch (error: unknown) {
            console.error('Erreur lors de la récupération des films populaires depuis TheMovieDB:', error);
            throw error;
        }
    }
}

export const theMovieDBService = new TheMovieDBService();


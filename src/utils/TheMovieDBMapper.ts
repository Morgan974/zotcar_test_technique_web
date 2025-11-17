import { MovieInterface } from '../Interfaces/MovieInterface';
import { TheMovieDBMovie, TheMovieDBCredits } from '../Interfaces/TheMovieDBInterface';

export const mapTheMovieDBToMovie = async (
    tmdbMovie: TheMovieDBMovie,
    getCredits: (idMovie: number) => Promise<TheMovieDBCredits>
): Promise<MovieInterface> => {
    let director = 'Inconnu';
    
    try {
        const credits = await getCredits(tmdbMovie.id);
        const directorCrew = credits.crew.find(person => person.job === 'Director');
        if (directorCrew) {
            director = directorCrew.name;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du réalisateur:', error);
    }

    const releaseDate = tmdbMovie.release_date 
        ? tmdbMovie.release_date.split('-')[0] 
        : '';

    return {
        id: tmdbMovie.id.toString(),
        idApi: tmdbMovie.id.toString(),
        title: tmdbMovie.title,
        director: director,
        releaseDate: releaseDate,
    };
};

export const mapTheMovieDBListToMovies = async (
    tmdbMovies: TheMovieDBMovie[],
    getCredits: (idMovie: number) => Promise<TheMovieDBCredits>
): Promise<MovieInterface[]> => {
    const movies = await Promise.all(
        tmdbMovies.map(movie => mapTheMovieDBToMovie(movie, getCredits))
    );
    return movies;
};


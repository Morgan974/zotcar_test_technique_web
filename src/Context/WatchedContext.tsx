import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MovieInterface } from '../Interfaces/MovieInterface';
import { apiService } from '../Services/ApiService';

interface WatchedContextType {
    watchedMovies: MovieInterface[];
    addToWatched: (movie: MovieInterface) => Promise<void>;
    removeFromWatched: (idMovie: string) => Promise<void>;
    isWatched: (idMovie: string) => boolean;
    isLoading: boolean;
    error: string | null;
    refreshWatchedMovies: (
        sortBy?: string,
        order?: 'asc' | 'desc',
        filters?: { title?: string; director?: string; releaseDate?: string }
    ) => Promise<void>;
}

const WatchedContext = createContext<WatchedContextType | undefined>(undefined);

export const useWatched = (): WatchedContextType => {
    const context = useContext(WatchedContext);
    if (!context) {
        throw new Error('useWatched must be used within a WatchedProvider');
    }
    return context;
};

interface WatchedProviderProps {
    children?: ReactNode | ReactNode[];
}

export const WatchedProvider = ({ children }: WatchedProviderProps): React.ReactElement => {
    const [watchedMovies, setWatchedMovies] = useState<MovieInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        refreshWatchedMovies();
    }, []);
    
    const addToWatched = async (movie: MovieInterface): Promise<void> => {
        try {
            setError(null);
            await apiService.addWatchedMovie(movie);
            await refreshWatchedMovies();
        } catch (err: unknown) {
            const errorMessage: string = err instanceof Error ? err.message : 'Erreur lors de l\'ajout du film';
            setError(errorMessage);
            throw err;
        }
    };

    const removeFromWatched = async (idMovie: string): Promise<void> => {
        try {
            setError(null);
            await apiService.removeWatchedMovie(idMovie);
            await refreshWatchedMovies();
        } catch (err: unknown) {
            const errorMessage: string = err instanceof Error ? err.message : 'Erreur lors de la suppression du film';
            setError(errorMessage);
            throw err;
        }
    };

    const isWatched = (idMovie: string): boolean => {
        return watchedMovies.some((m: MovieInterface) => m.id === idMovie);
    };

    const refreshWatchedMovies = async (
        sortBy: string = 'title',
        order: 'asc' | 'desc' = 'asc',
        filters?: { title?: string; director?: string; releaseDate?: string }
    ): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            const movies: MovieInterface[] = await apiService.getAllWatchedMovies(sortBy, order, filters);
            setWatchedMovies(movies);
        } catch (err: unknown) {
            const errorMessage: string = err instanceof Error ? err.message : 'Erreur lors du chargement des films';
            setError(errorMessage);
            console.error('Erreur lors du chargement des films déjà vus:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <WatchedContext.Provider
            value={{
                watchedMovies,
                addToWatched,
                removeFromWatched,
                isWatched,
                isLoading,
                error,
                refreshWatchedMovies,
            }}
        >
            {children}
        </WatchedContext.Provider>
    );
}
import React, { useState } from 'react';
import HeaderComponent from '../Components/HeaderComponent';
import PageLayout from '../Components/PageLayout';
import SearchBar from '../Components/SearchBar';
import MovieContainerComponent from '../Components/MovieContainerComponent';
import StatusMessage from '../Components/StatusMessage';
import { MovieInterface } from '../Interfaces/MovieInterface';
import { useWatched } from '../Context/WatchedContext';

const WatchedPage = (): React.ReactElement => {
    const { watchedMovies, removeFromWatched, isLoading, error, refreshWatchedMovies } = useWatched();
    const [removingMovieId, setRemovingMovieId] = useState<string | null>(null);
    const [currentFilters, setCurrentFilters] = useState<{ title?: string; director?: string; releaseDate?: string } | undefined>(undefined);
    const [searchValues, setSearchValues] = useState<{ title?: string; director?: string; year?: string }>({});

    const handleRemoveFromWatched = async (movie: MovieInterface): Promise<void> => {
        setRemovingMovieId(movie.id);
        try {
            await removeFromWatched(movie.id);
            await refreshWatchedMovies('title', 'asc', currentFilters);
        } catch (err: unknown) {
            console.error('Erreur lors de la suppression du film:', err);
            alert(err instanceof Error ? err.message : 'Erreur lors de la suppression du film');
        } finally {
            setRemovingMovieId(null);
        }
    };

    const handleSearch = (filters: { title?: string; director?: string; year?: string }): void => {
        setSearchValues(filters);
        const searchFilters = {
            title: filters.title,
            director: filters.director,
            releaseDate: filters.year
        };
        setCurrentFilters(searchFilters);
        void refreshWatchedMovies('title', 'asc', searchFilters);
    };

    const handleResetSearch = (): void => {
        setSearchValues({});
        setCurrentFilters(undefined);
        void refreshWatchedMovies();
    };

    if (isLoading) {
        return (
            <PageLayout>
                <HeaderComponent 
                    link="/" 
                    title="Déjà vus"
                    buttonText="Page d'accueil" 
                />
                <StatusMessage type="loading" />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <HeaderComponent 
                link="/" 
                title="Déjà vus"
                buttonText="Page d'accueil" 
            />
            {error && <StatusMessage type="error" message={'Erreur: ' + error} />}
            <SearchBar onSearch={handleSearch} onReset={handleResetSearch} initialFilters={searchValues} />
            <MovieContainerComponent
                title="Films déjà vus"
                movies={watchedMovies}
                onButtonClick={handleRemoveFromWatched}
                textButton="Supprimer un film"
                typeButton="danger"
                showDetailButton={true}
            />
        </PageLayout>
    );
}

export default WatchedPage;
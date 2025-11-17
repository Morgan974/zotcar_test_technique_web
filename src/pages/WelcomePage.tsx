import React, { useEffect, useState } from 'react';
import HeaderComponent from '../Components/HeaderComponent';
import PageLayout from '../Components/PageLayout';
import SearchBar from '../Components/SearchBar';
import MovieContainerComponent from '../Components/MovieContainerComponent';
import StatusMessage from '../Components/StatusMessage';
import PaginationComponent from '../Components/PaginationComponent';
import { MovieInterface } from '../Interfaces/MovieInterface';
import { useWatched } from '../Context/WatchedContext';
import { theMovieDBService } from '../Services/TheMovieDBService';
import { mapTheMovieDBListToMovies } from '../utils/TheMovieDBMapper';

const WelcomePage = (): React.ReactElement => {
    const { addToWatched, isWatched, error, refreshWatchedMovies } = useWatched();
    const [addingMovieId, setAddingMovieId] = useState<string | null>(null);
    const [searchFilters, setSearchFilters] = useState<{ title?: string; year?: string }>({});
    const [movies, setMovies] = useState<MovieInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tmdbError, setTmdbError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isSearchMode, setIsSearchMode] = useState<boolean>(false);

    const getCredits = async (idMovie: number) => {
        return await theMovieDBService.getMovieCredits(idMovie);
    };

    const loadPopularMovies = async (page: number = 1, year?: string): Promise<void> => {
        setIsLoading(true);
        setTmdbError(null);
        setIsSearchMode(false);

        try {
            const response = await theMovieDBService.getPopularMovies(page, year);
            setTotalPages(response.total_pages);
            setCurrentPage(response.page);

            const mappedMovies = await mapTheMovieDBListToMovies(response.results, getCredits);
            setMovies(mappedMovies);
        } catch (err: unknown) {
            console.error('Erreur lors du chargement des films populaires:', err);
            setTmdbError(err instanceof Error ? err.message : 'Erreur lors du chargement des films');
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void refreshWatchedMovies();
        void loadPopularMovies(1);
    }, []);

    const searchTMDBMovies = async (filters: { title?: string; year?: string }, page: number = 1): Promise<void> => {
        if (!filters.title || filters.title.trim() === '') {
            void loadPopularMovies(1, filters.year);
            return;
        }

        setIsLoading(true);
        setTmdbError(null);
        setIsSearchMode(true);

        try {
            const searchResponse = await theMovieDBService.searchMovies(filters.title, page, filters.year);
            setTotalPages(searchResponse.total_pages);
            setCurrentPage(searchResponse.page);

            const mappedMovies = await mapTheMovieDBListToMovies(searchResponse.results, getCredits);
            setMovies(mappedMovies);
        } catch (err: unknown) {
            console.error('Erreur lors de la recherche TMDB:', err);
            setTmdbError(err instanceof Error ? err.message : 'Erreur lors de la recherche');
            setMovies([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddToWatched = async (movie: MovieInterface): Promise<void> => {
        if (isWatched(movie.id)) {
            return;
        }
        setAddingMovieId(movie.id);
        try {
            await addToWatched(movie);
        } catch (err: unknown) {
            console.error('Erreur lors de l\'ajout du film:', err);
            alert(err instanceof Error ? err.message : 'Erreur lors de l\'ajout du film');
        } finally {
            setAddingMovieId(null);
        }
    };

    const handleSearch = (filters: { title?: string; year?: string }): void => {
        setSearchFilters(filters);
        setCurrentPage(1);
        void searchTMDBMovies(filters, 1);
    };

    const handleResetSearch = (): void => {
        setSearchFilters({});
        setCurrentPage(1);
        void loadPopularMovies(1);
    };

    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
        if (isSearchMode) {
            void searchTMDBMovies(searchFilters, page);
        } else {
            void loadPopularMovies(page, searchFilters.year);
        }
    };

    return (
        <PageLayout>
            <HeaderComponent 
                link="/watched" 
                title="Bienvenue"
                buttonText="Déjà vus"
            />
            {error && <StatusMessage type="error" message={'Erreur: ' + error} />}
            {tmdbError && <StatusMessage type="error" message={'Erreur TMDB: ' + tmdbError} />}
            <SearchBar onSearch={handleSearch} onReset={handleResetSearch} />
            {isLoading && <StatusMessage type="loading" message="Chargement en cours..." />}
            <MovieContainerComponent
                title={isSearchMode ? 'Résultats de recherche' : 'Films populaires'}
                movies={movies}
                onButtonClick={handleAddToWatched}
                textButton="Ajouter un film"
                typeButton="success"
                isButtonDisabled={(movie) => isWatched(movie.id)}
                buttonLoadingId={addingMovieId}
            />
            {totalPages > 1 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </PageLayout>
    );
}

export default WelcomePage;
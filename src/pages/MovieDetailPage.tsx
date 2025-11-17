import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../Components/HeaderComponent';
import PageLayout from '../Components/PageLayout';
import MovieDetailCard from '../Components/MovieDetailCard';
import StatusMessage from '../Components/StatusMessage';
import { MovieInterface } from '../Interfaces/MovieInterface';
import { apiService } from '../Services/ApiService';

const MovieDetailPage = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async (): Promise<void> => {
            if (!id) {
                setError('ID du film manquant');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const movieData = await apiService.getWatchedMovie(id);
                setMovie(movieData);
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement du film';
                setError(errorMessage);
                console.error('Erreur lors du chargement du film:', err);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchMovie();
    }, [id]);

    if (isLoading) {
        return (
            <PageLayout>
                <HeaderComponent 
                    link="/watched" 
                    title="Détails du film"
                    buttonText="Retour" 
                />
                <StatusMessage type="loading" />
            </PageLayout>
        );
    }

    if (error || !movie) {
        return (
            <PageLayout>
                <HeaderComponent 
                    link="/watched" 
                    title="Détails du film"
                    buttonText="Retour" 
                />
                <StatusMessage type="error" message={error || 'Film non trouvé'} />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <HeaderComponent 
                link="/watched" 
                title="Détails du film"
                buttonText="Retour" 
            />
            <MovieDetailCard movie={movie} />
        </PageLayout>
    );
};

export default MovieDetailPage;


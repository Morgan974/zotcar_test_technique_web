import React from 'react';
import CardComponent from './CardComponent';
import { MovieInterface } from '../Interfaces/MovieInterface';
import './MovieDetailCard.css';

interface MovieDetailCardProps {
    movie: MovieInterface;
}

const MovieDetailCard = ({ movie }: MovieDetailCardProps): React.ReactElement => {
    const formatReleaseDate = (date: string): string => {
        if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return date.split('-')[0];
        }
        return date;
    };

    return (
        <div className="movie-detail-container">
            <CardComponent>
                <h2 className="movie-detail-title">{movie.title}</h2>
                <div className="movie-detail-info">
                    <div className="movie-detail-item">
                        <span className="movie-detail-label">Réalisateur :</span>
                        <span className="movie-detail-value">{movie.director || 'Inconnu'}</span>
                    </div>
                    <div className="movie-detail-item">
                        <span className="movie-detail-label">Date de sortie :</span>
                        <span className="movie-detail-value">{formatReleaseDate(movie.releaseDate)}</span>
                    </div>
                    {movie.idApi && (
                        <div className="movie-detail-item">
                            <span className="movie-detail-label">ID API :</span>
                            <span className="movie-detail-value">{movie.idApi}</span>
                        </div>
                    )}
                </div>
            </CardComponent>
        </div>
    );
};

export default MovieDetailCard;


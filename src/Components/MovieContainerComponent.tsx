import React from 'react';
import './MovieContainerComponent.css';
import CardComponent from './CardComponent';
import { MovieInterface } from '../Interfaces/MovieInterface';

interface MovieContainerProps {
    title : string;
    movies : MovieInterface[];
}

const MovieContainerComponent = ({
    title,
    movies
}: MovieContainerProps): React.ReactElement => {

    return (
        <main className="movies-container">
            <h2>{title}</h2>
            <div className="movies-list">
                {movies.length === 0 ? (
                    <CardComponent key="no-results">
                        <p className="no-results-text">Aucun film trouvé</p>
                    </CardComponent>
                ) : (
                    movies.map((movie) => (
                        <CardComponent key={movie.id}>
                            <h3 className="movie-title">{movie.title}</h3>
                            <p className="movie-director">
                                <span className="label">Réalisateur :</span> {movie.director || 'Inconnu'}
                            </p>
                            <p className="movie-release-date">
                                <span className="label">Date de sortie :</span> {movie.releaseDate}
                            </p>
                        </CardComponent>
                    ))
                )}
            </div>
        </main>
    );
}

export default MovieContainerComponent;
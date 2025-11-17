import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardComponent from './CardComponent';
import ButtonComponent from './ButtonComponent';
import { MovieInterface } from '../Interfaces/MovieInterface';
import './MovieContainerComponent.css';

interface MovieContainerProps {
    title : string;
    movies : MovieInterface[];
    onButtonClick: Function;
    textButton: string;
    typeButton: 'primary' | 'secondary' | 'danger' | 'success';
    isButtonDisabled?: (movie: MovieInterface) => boolean;
    buttonLoadingId?: string | null;
    showDetailButton?: boolean;
}

const MovieContainerComponent = ({
    title,
    movies,
    onButtonClick,
    textButton,
    typeButton,
    isButtonDisabled,
    buttonLoadingId,
    showDetailButton = false
}: MovieContainerProps): React.ReactElement => {
    const navigate = useNavigate();

    const formatReleaseDate = (date: string): string => {
        if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return date.split('-')[0];
        }
        return date;
    };

    const handleDetailClick = (movie: MovieInterface): void => {
        navigate('/movie/' + movie.id);
    };

    return (
        <main className="movies-container">
            <h2>{title}</h2>
            {movies.length === 0 ? (
                <CardComponent key="no-results">
                    <p className="no-results-text">Aucun film trouvé</p>
                </CardComponent>
            ) : (
                <div className="movies-table">
                    <div className="movies-table-header">
                        <div className="movies-table-cell header-cell">Titre</div>
                        <div className="movies-table-cell header-cell">Réalisateur</div>
                        <div className="movies-table-cell header-cell">Date de sortie</div>
                        <div className="movies-table-cell header-cell">Action</div>
                    </div>
                    <div className="movies-table-body">
                        {movies.map((movie) => {
                            const isDisabled = isButtonDisabled ? isButtonDisabled(movie) : false;
                            const isLoading = buttonLoadingId === movie.id;
                            
                            return (
                                <CardComponent key={movie.id} className="movies-table-row">
                                    <div className="movies-table-cell cell-title">
                                        {movie.title}
                                    </div>
                                    <div className="movies-table-cell">
                                        {movie.director || 'Inconnu'}
                                    </div>
                                    <div className="movies-table-cell">
                                        {formatReleaseDate(movie.releaseDate)}
                                    </div>
                                    <div className="movies-table-cell">
                                        <div className="movie-buttons">
                                            {showDetailButton && (
                                                <ButtonComponent
                                                    variant="secondary"
                                                    onClick={() => handleDetailClick(movie)}
                                                    disabled={false}
                                                    className="button-secondary"
                                                    type="button"
                                                >
                                                    Voir les détails
                                                </ButtonComponent>
                                            )}
                                            <ButtonComponent
                                                variant={typeButton}
                                                onClick={() => onButtonClick(movie)}
                                                disabled={isDisabled || isLoading}
                                                className={"button-" + typeButton}
                                                type="button"
                                            >
                                                {isLoading ? 'Chargement...' : (isDisabled ? 'Déjà ajouté' : textButton)}
                                            </ButtonComponent>
                                        </div>
                                    </div>
                                </CardComponent>
                            );
                        })}
                    </div>
                </div>
            )}
        </main>
    );
}

export default MovieContainerComponent;
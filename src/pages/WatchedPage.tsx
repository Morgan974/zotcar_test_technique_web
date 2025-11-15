import React from 'react'
import HeaderComponent from '../Components/HeaderComponent';
import MovieContainerComponent from '../Components/MovieContainerComponent';
import { MovieInterface } from '../Interfaces/MovieInterface';

const sampleMovies: MovieInterface[] = [];

const WatchedPage = (): React.ReactElement => {

    return (
        <div className="watched-page">
            <HeaderComponent 
                link="/" 
                title="Déjà vus"
                buttonText="Page d'accueil" 
            />  
            <MovieContainerComponent
                title="Film déjà vus"
                movies={sampleMovies}
            />
        </div>
    );
}

export default WatchedPage;
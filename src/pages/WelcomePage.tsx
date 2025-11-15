import React from 'react';
import "./WelcomePage.css";
import HeaderComponent from '../Components/HeaderComponent';
import MovieContainerComponent from '../Components/MovieContainerComponent';
import { MovieInterface } from '../Interfaces/MovieInterface';

const sampleMovies: MovieInterface[] = [
    {
        id: '1',
        idIMDB: 'tt1375666',
        title: 'Inception',
        director: 'Christopher Nolan',
        releaseDate: '2010',
    },
    {
        id: '2',
        idIMDB: 'tt0133093',
        title: 'The Matrix',
        director: 'Lana Wachowski, Lilly Wachowski',
        releaseDate: '1999',
    },
    {
        id: '3',
        idIMDB: 'tt0816692',
        title: 'Interstellar',
        director: 'Christopher Nolan',
        releaseDate: '2014',
    },
    {
        id: '4', 
        idIMDB: 'tt0110912',
        title: 'Pulp Fiction',
        director: 'Quentin Tarantino',
        releaseDate: '1994',
    },
    {
        id: '5',
        idIMDB: 'tt0468569',
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        releaseDate: '2008',
    },
    {
        id: '6',
        idIMDB: 'tt0137523',
        title: 'Fight Club',
        director: 'David Fincher',
        releaseDate: '1999',
    },
];

const WelcomePage = (): React.ReactElement => {

    return (
        <div className="welcome-page">
            <HeaderComponent 
                link="/watched" 
                title="Bienvenue"
                buttonText="Déjà vus" // rajoute indice avec le nombre de films déjà vus
            />
            <MovieContainerComponent
                title="Liste des films"
                movies={sampleMovies}
            />
        </div>
    );
}

export default WelcomePage;
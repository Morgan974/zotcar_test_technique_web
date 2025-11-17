import React from 'react';
import './styles/global.css';
import WelcomePage from './pages/WelcomePage';
import WatchedPage from './pages/WatchedPage';
import MovieDetailPage from './pages/MovieDetailPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WatchedProvider } from './Context/WatchedContext';

function App() {
    return (
      	<WatchedProvider>
        	<BrowserRouter>
          		<div className="App">
            		<Routes>
              			<Route path="/" element={<WelcomePage />} />
              			<Route path="/watched" element={<WatchedPage />} />
              			<Route path="/movie/:id" element={<MovieDetailPage />} />
              		</Routes>
            	</div>
        	</BrowserRouter>
      	</WatchedProvider>
    );
}

export default App;

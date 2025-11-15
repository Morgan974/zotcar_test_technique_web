import React from 'react';
import logo from './logo.svg';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import WatchedPage from './pages/WatchedPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/watched" element={<WatchedPage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;

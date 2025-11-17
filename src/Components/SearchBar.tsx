import React, { useState, useEffect } from 'react';
import './SearchBar.css';

interface SearchFilters {
    title?: string;
    year?: string;
}

interface SearchBarProps {
    onSearch: (filters: SearchFilters) => void;
    onReset: () => void;
    initialFilters?: SearchFilters;
}

const SearchBar = ({ onSearch, onReset, initialFilters }: SearchBarProps): React.ReactElement => {
    const [title, setTitle] = useState(initialFilters?.title || '');
    const [year, setYear] = useState(initialFilters?.year || '');

    useEffect(() => {
        if (initialFilters) {
            setTitle(initialFilters.title || '');
            setYear(initialFilters.year || '');
        }
    }, [initialFilters]);

    const handleSearch = (): void => {
        const filters: SearchFilters = {};
        if (title.trim()) {
            filters.title = title.trim();
        }
        if (year.trim()) {
            filters.year = year.trim();
        }
        onSearch(filters);
    };

    const handleReset = (): void => {
        setTitle('');
        setYear('');
        onReset();
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <div className="search-fields">
                    <div className="search-field">
                        <label htmlFor="search-title" className="label">Titre</label>
                        <input
                            id="search-title"
                            type="text"
                            className="input"
                            placeholder="Rechercher par titre..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className="search-field">
                        <label htmlFor="search-year" className="label">Année</label>
                        <input
                            id="search-year"
                            type="text"
                            className="input"
                            placeholder="Ex: 2010"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            onKeyPress={handleKeyPress}
                            maxLength={4}
                        />
                    </div>
                </div>
                <div className="search-actions">
                    <button type="button" onClick={handleSearch} className="button primary search-button">
                        Rechercher
                    </button>
                    <button type="button" onClick={handleReset} className="button secondary reset-button">
                        Réinitialiser
                    </button>
            </div>
        </div>
    );
};

export default SearchBar;


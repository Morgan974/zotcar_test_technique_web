import React from 'react';
import './PaginationComponent.css';

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = ({ currentPage, totalPages, onPageChange }: PaginationComponentProps): React.ReactElement => {
    const handlePrevious = (): void => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = (): void => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number): void => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const getPageNumbers = (): number[] => {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (totalPages <= 1) {
        return <></>;
    }

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination flex justify-center align-center gap-md">
            <button
                type="button"
                className="pagination-button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                Précédent
            </button>
            <div className="pagination-pages">
                {pageNumbers[0] > 1 && (
                    <>
                        <button
                            type="button"
                            className="pagination-page"
                            onClick={() => handlePageClick(1)}
                        >
                            1
                        </button>
                        {pageNumbers[0] > 2 && <span className="pagination-ellipsis">...</span>}
                    </>
                )}
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={'pagination-page' + (page === currentPage ? ' active' : '')}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                ))}
                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                            <span className="pagination-ellipsis">...</span>
                        )}
                        <button
                            type="button"
                            className="pagination-page"
                            onClick={() => handlePageClick(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>
            <button
                type="button"
                className="pagination-button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Suivant
            </button>
        </div>
    );
};

export default PaginationComponent;


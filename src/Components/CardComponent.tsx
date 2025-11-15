import React from 'react';
import './CardComponent.css';

interface CardComponentProps {
    children : React.ReactNode;
}

const CardComponent = ({
    children
}: CardComponentProps): React.ReactElement => {
    return (
        <div className="card">
            {children}
        </div>
    );
}

export default CardComponent;
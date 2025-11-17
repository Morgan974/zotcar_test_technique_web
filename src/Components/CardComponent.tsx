import React from 'react';
import './CardComponent.css';

interface CardComponentProps {
    children : React.ReactNode;
    className?: string;
}

const CardComponent = ({
    children,
    className
}: CardComponentProps): React.ReactElement => {
    return (
        <div className={'card' + (className ? ' ' + className : '')}>
            {children}
        </div>
    );
}

export default CardComponent;
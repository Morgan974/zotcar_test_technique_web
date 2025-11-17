import React from 'react';
import './StatusMessage.css';

interface StatusMessageProps {
    type: 'loading' | 'error';
    message?: string;
}

const StatusMessage = ({ type, message }: StatusMessageProps): React.ReactElement => {
    const className = type === 'loading' ? 'status-message loading' : 'status-message error';
    const defaultMessage = type === 'loading' ? 'Chargement...' : 'Une erreur est survenue';

    return (
        <div className={className}>
            {message || defaultMessage}
        </div>
    );
};

export default StatusMessage;


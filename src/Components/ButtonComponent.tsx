import React from 'react';
import { ButtonVariant } from '../types/ButtonType';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const ButtonComponent = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
    type = 'button'
}: ButtonProps): React.ReactElement => {
    const buttonClass = 'button ' + variant + (disabled ? ' disabled' : '') + ' ' + className?.trim();
    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ButtonComponent;
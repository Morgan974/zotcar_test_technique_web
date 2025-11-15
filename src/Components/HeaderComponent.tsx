import React from 'react';
import "./HeaderComponent.css";
import { Link } from 'react-router-dom';

interface HeaderProps {
    link : string;
    title : string;
    buttonText : string;
}

const HeaderComponent = ({
    link,
    title,
    buttonText
  }: HeaderProps): React.ReactElement => {

    return (
        <header className="header">
            <h1>{title}</h1>
            <Link to={link} className="header-button">
                {buttonText}
            </Link>
        </header>
    );
}

export default HeaderComponent;
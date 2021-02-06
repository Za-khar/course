import React from 'react';
import './MenuItem.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MenuItem( {text, path} ) {
    return(
        <Link to={path} className="menu__item">
            {text}
        </Link>
    );
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}

export default MenuItem;
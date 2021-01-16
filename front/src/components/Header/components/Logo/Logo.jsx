import React from 'react';
import './Logo.css';
import PropTypes from 'prop-types';
import ArticlesContainer from '../../../UserContainers/ArticlesPage/ArticlesPage';

function Logo({clickLogo}) {
    return (
        <h1 onClick={() => clickLogo(<ArticlesContainer/>)} className="logo-title">Swiftchat</h1>
    );
}

Logo.propTypes = {
    clickLogo: PropTypes.func.isRequired,
}

export default Logo;

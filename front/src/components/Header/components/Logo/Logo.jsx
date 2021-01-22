import React from 'react';
import './Logo.css';
import PropTypes from 'prop-types';

function Logo({clickLogo}) {
    return (
        <h1 onClick={clickLogo} className="logo-title" name="logo_button">Swiftchat</h1>
    );
}

Logo.propTypes = {
    clickLogo: PropTypes.func.isRequired,
}

export default Logo;

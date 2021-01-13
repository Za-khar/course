import React from 'react';
import './MenuItem.css';
import PropTypes from 'prop-types';

function MenuItem( {text, clickMenuItem} ) {
    return(
        <li className="menu__item" onClick={clickMenuItem}>
            {text}
        </li>
    );
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    clickMenuItem: PropTypes.func.isRequired,
}

export default MenuItem;
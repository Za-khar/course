import React from 'react';
import './MenuItem.css';
import PropTypes from 'prop-types';


function MenuItem( {text, clickMenuItem} ) {
    return(
        <li className="menu__item" onClick={clickMenuItem} name="my_profile_button">
            {text}
        </li>
    );
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    clickMenuItem: PropTypes.func,
}

export default MenuItem;
import React from 'react';
import './MenuItem.css';
import PropTypes from 'prop-types';
import MyProfileContainer from '../../../../../../UserContainers/MyProfile/MyProfile';

function MenuItem( {text, clickMenuItem, setUsername} ) {
    return(
        <li className="menu__item" onClick={() => clickMenuItem(<MyProfileContainer setUsername={setUsername}/>)}>
            {text}
        </li>
    );
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    clickMenuItem: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
}

export default MenuItem;
import React from 'react';
import './Menu.css';
import MenuItem from './components/MenuItem';
import PropTypes from 'prop-types';

function Menu({clickProfile, setUsername}) {
    
    return(
        <ul className="menu">
            <MenuItem clickMenuItem={clickProfile} text={'Profile'} setUsername={setUsername}/>
            <MenuItem text={'LogOut'}/>
        </ul>
    );
}

Menu.propTypes = {
    clickProfile: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
}

export default Menu;
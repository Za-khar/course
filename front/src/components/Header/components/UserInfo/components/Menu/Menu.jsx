import React from 'react';
import './Menu.css';
import MenuItem from './components/MenuItem';
import PropTypes from 'prop-types';

function Menu({clickProfile}) {
    
    return(
        <ul className="menu">
            <MenuItem clickMenuItem={clickProfile} text={'Profile'}/>
            <MenuItem text={'LogOut'}/>
        </ul>
    );
}

Menu.propTypes = {
    clickProfile: PropTypes.func.isRequired,
}

export default Menu;
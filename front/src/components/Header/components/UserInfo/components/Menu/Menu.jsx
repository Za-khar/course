import React from 'react';
import './Menu.css';
import MenuItem from './components/MenuItem';
import PropTypes from 'prop-types';

function Menu({clickProfile}) {
    
    return(
        <ul className="menu">
            <MenuItem clickMenuItem={clickProfile} text={'Profile'} link={'#'}></MenuItem>
            <MenuItem text={'LogOut'}></MenuItem>
        </ul>
    );
}

Menu.propTypes = {
    clickProfile: PropTypes.func.isRequired,
}

export default Menu;
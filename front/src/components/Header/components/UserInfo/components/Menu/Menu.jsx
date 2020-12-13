import React from 'react';
import './Menu.css';
import MenuItem from './components/MenuItem';

function Menu() {
    return(
        <ul className="menu">
            <MenuItem text={'Profile'} link={'#'}></MenuItem>
            <MenuItem text={'LogOut'} link={'#'}></MenuItem>
        </ul>
    );
}

export default Menu;
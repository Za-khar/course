import React from 'react';
import './Menu.css';
import MenuItem from './components/MenuItem';
import {useRouteMatch} from 'react-router-dom';

function Menu() {
    const match = useRouteMatch();
    return(
        <div className="menu">
            <MenuItem text={'Profile'} path={`${match.url}/profile`}/>
            <MenuItem text={'LogOut'} path={`/`}/>
        </div>
    );
}

export default Menu;
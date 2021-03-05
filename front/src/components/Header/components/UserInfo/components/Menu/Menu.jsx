import React from 'react';
import './Menu.css';
import {useRouteMatch, Link} from 'react-router-dom';

function Menu() {
    const match = useRouteMatch();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
    }

    return(
        <div className="menu">
            <Link className="menu__item" to={`${match.url}/profile`}>Profile</Link>
            <Link onClick={handleLogout} className="menu__item" to={`/`}>LogOut</Link>
        </div>
    );
}

export default Menu;
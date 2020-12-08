import React from 'react';
import './MenuItem.css';

function Menu( {text, link} ) {
    return(
        <li className="menu__item">
            <a className="menu_link" href={link}>{text}</a>
        </li>
    );
}

export default Menu;
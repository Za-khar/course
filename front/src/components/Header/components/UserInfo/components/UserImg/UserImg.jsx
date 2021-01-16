import React from 'react';
import userPicture from './img/user-picture.jpg';
import './UserImg.css';

function UserImg() {
    return(
        <img className="user__img" src={userPicture} alt=""/>
    );
}

export default UserImg;
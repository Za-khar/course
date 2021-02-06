import React from 'react';
import UserImg from './components/UserImg/UserImg';
import UserName from './components/UserName/UserName';
import Menu from './components/Menu/Menu';
import './UserInfo.css';
import PropTypes from 'prop-types';
import userNameType from '../../PropTypes/userName';

function UserInfo({username}) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="user-info" onClick={handleClick}>
            <div className="user-info__content">
                <UserImg/>
                <UserName username={username}/>
            </div>
            {
                isOpen && <Menu/>
            }
        </div>
    );
}

UserInfo.propTypes = {
    username: userNameType,
}

export default UserInfo;
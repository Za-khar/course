import React from 'react';
import UserImg from './components/UserImg/UserImg';
import UserName from './components/UserName/UserName';
import Menu from './components/Menu/Menu';
import './UserInfo.css';
import PropTypes from 'prop-types';
import userNameType from '../../PropTypes/userName';

function UserInfo({clickProfile, username, setUsername}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="user-info" onClick={() => setIsOpen(!isOpen)}>
            <div className="user-info__content">
                <UserImg/>
                <UserName username={username}/>
            </div>
            {
                isOpen && <Menu  clickProfile={clickProfile} setUsername={setUsername}/>
            }
        </div>
    );
}

UserInfo.propTypes = {
    clickProfile: PropTypes.func.isRequired,
    username: userNameType,
    setUsername: PropTypes.func.isRequired,
}

export default UserInfo;
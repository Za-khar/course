import React from 'react';
import UserImg from './components/UserImg/UserImg';
import UserName from './components/UserName/UserName';
import Menu from './components/Menu/Menu';
import './UserInfo.css';
import PropTypes from 'prop-types';

function UserInfo({clickProfile, username}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="user-info" onClick={() => setIsOpen(!isOpen)}>
            <div className="user-info__content">
                <UserImg></UserImg>
                <UserName username={username}></UserName>
            </div>
            {
                isOpen && <Menu  clickProfile={clickProfile}></Menu>
            }
        </div>
    );
}

const objectUsername = PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    secondName: PropTypes.string.isRequired
});

UserInfo.propTypes = {
    clickProfile: PropTypes.func.isRequired,
    username: objectUsername,
}

export default UserInfo;
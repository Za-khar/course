import React from 'react';
import './UserName.css';
import userNameType from '../../../../PropTypes/userName';

function UserName({username}) {
    return (
        <h2 className="user-name">{username.firstName + ' ' + username.secondName}</h2>
    );
}

UserName.propTypes = {
    username: userNameType,
}

export default UserName;
import React from 'react';
import './UserName.css';
import PropTypes from 'prop-types';

function UserName({username}) {
    return (
        <h2 className="user-name">{username.firstName + ' ' + username.secondName}</h2>
    );
}

const objectUsername = PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    secondName: PropTypes.string.isRequired
});

UserName.propTypes = {
    username: objectUsername,
}

export default UserName;
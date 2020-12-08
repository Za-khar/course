import React from 'react';
import UserImg from './components/UserImg/UserImg';
import UserName from './components/UserName/UserName';
import Menu from './components/Menu/Menu';
import './UserInfo.css';

function UserInfo() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="user-info" onClick={() => setIsOpen(!isOpen)}>
            <div className="user-info__content">
                <UserImg></UserImg>
                <UserName></UserName>
            </div>
            {
                isOpen && <Menu></Menu>
            }
        </div>
    );
}

export default UserInfo;
import React from 'react';
import './Header.css';
import Logo from './components/Logo/Logo';
import UserInfo from './components/UserInfo/UserInfo';
import AddArticleButton from './components/AddArticleButton/AddArticleButton';
import Container from '../../containers/Container';
import PropTypes from 'prop-types';
import userNameType from './PropTypes/userName';

function Header({handleContainer, username, setUsername}) {
    return (
        <div className="header">
            <Container>
                <div className="header-block">
                    <Logo clickLogo={handleContainer}/>   
                    <AddArticleButton clickAddArticleButton={handleContainer}/>
                    <UserInfo clickProfile={handleContainer} username={username} setUsername={setUsername}/>
                </div>
            </Container>
        </div>
        
    );
}

Header.propTypes = {
    handleContainer: PropTypes.func.isRequired,
    username: userNameType,
    setUsername: PropTypes.func.isRequired
}

export default Header;
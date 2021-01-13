import React from 'react';
import './Header.css';
import Logo from './components/Logo/Logo';
import UserInfo from './components/UserInfo/UserInfo';
import AddArticleButton from './components/AddArticleButton/AddArticleButton';
import CreateArticleContainer from '../UserContainers/CreateArticle/CreateArticle';
import ArticlesContainer from '../UserContainers/ArticlesPage/ArticlesPage';
import MyProfileContainer from '../UserContainers/MyProfile/MyProfile';
import Container from '../../containers/Container';
import PropTypes from 'prop-types';

function Header({handleContainer, username, setUsername}) {
    const clickLogo = () => {
        handleContainer(<ArticlesContainer></ArticlesContainer>);
    }
    const clickAddArticleButton = () => {
        handleContainer(<CreateArticleContainer></CreateArticleContainer>);
    }
    const clickProfile = () => {
        handleContainer(<MyProfileContainer setUsername={setUsername}></MyProfileContainer>);
    }

    return (
        <div className="header">
            <Container>
                <div className="header-block">
                    <Logo clickLogo={clickLogo}></Logo>   
                    <AddArticleButton clickAddArticleButton={clickAddArticleButton}></AddArticleButton>
                    <UserInfo clickProfile={clickProfile} username={username}></UserInfo>
                </div>
            </Container>
        </div>
        
    );
}

const objectUsername = PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    secondName: PropTypes.string.isRequired
});

Header.propTypes = {
    handleContainer: PropTypes.func.isRequired,
    username: objectUsername,
    setUsername: PropTypes.func.isRequired
}

export default Header;
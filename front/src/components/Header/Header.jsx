import React from 'react';
import './Header.css';
import Logo from './components/Logo/Logo';
import UserInfo from './components/UserInfo/UserInfo';
import AddArticleButton from './components/AddArticleButton/AddArticleButton';
import Container from '../../containers/Container';

import ArticlesContainer from '../UserContainers/ArticlesPage/ArticlesPage';
import CreateArticleContainer from '../UserContainers/CreateArticle/CreateArticle';
import MyProfileContainer from '../UserContainers/MyProfile/MyProfile';

import PropTypes from 'prop-types';
import userNameType from './PropTypes/userName';

function Header({handleContainer, username, setUsername}) {

    const handleClick = e => {
        e.preventDefault();
        if(e.target.attributes.name.textContent === 'logo_button'){
            handleContainer(<ArticlesContainer/>);
        }
        if(e.target.attributes.name.textContent === 'add_article_button'){
            handleContainer(<CreateArticleContainer/>);
        }
        if(e.target.attributes.name.textContent === 'my_profile_button'){
            handleContainer(<MyProfileContainer setUsername={setUsername}/>);
        }
    }

    return (
        <div className="header">
            <Container>
                <div className="header-block">
                    <Logo clickLogo={handleClick}/>   
                    <AddArticleButton clickAddArticleButton={handleClick}/>
                    <UserInfo clickProfile={handleClick} username={username}/>
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
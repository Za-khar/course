import React from 'react';
import './Header.css';
import Logo from './components/Logo/Logo';
import UserInfo from './components/UserInfo/UserInfo';
import AddArticleButton from './components/AddArticleButton/AddArticleButton';
import Container from '../../containers/Container';
import {Link, useRouteMatch} from 'react-router-dom';

import userNameType from './PropTypes/userName';

function Header({username}) {
    const match = useRouteMatch();
    
    return (
        <div className="header">
            <Container>
                <div className="header-block">
                    <Link to={`${match.url}`} className="header-link">
                        <Logo/>   
                    </Link>
                    <Link to={`${match.url}/create-article`} className="header-link">
                        <AddArticleButton/>
                    </Link>
                    <UserInfo username={username}/>
                </div>
            </Container>
        </div>
    );
}

Header.propTypes = {
    username: userNameType,
}

export default Header;
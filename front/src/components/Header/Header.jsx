import React from 'react';
import './Header.css';
import Logo from './components/Logo/Logo';
import UserInfo from './components/UserInfo/UserInfo';
import AddArticleButton from './components/AddArticleButton/AddArticleButton';
import Container from '../Container/Container';

function Header() {
    return (
        <div className="header">
            <Container>
                <div className="header-block">
                    <Logo></Logo>
                    <AddArticleButton></AddArticleButton>
                    <UserInfo></UserInfo>
                </div>
            </Container>
        </div>
        
    );
}

export default Header;
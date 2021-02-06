import React from 'react';
import Container from '../../containers/Container';
import './GuestHeader.css';
import Logo from '../../components/Header/components/Logo/Logo'
import LoginButton from './components/LoginButton';

function GuestHeader () {
    return(
        <div className="guest-header">
            <Container>
                <div className="guest-header-block">
                    <Logo/>
                    <LoginButton/>
                </div>
            </Container>
        </div>
    );
}

export default GuestHeader;
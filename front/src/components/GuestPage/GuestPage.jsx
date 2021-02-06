import React from 'react';
import GuestHeader from '../GuestHeader/GuestHeader';
import Container from '../../containers/Container';
import LoginForm from "./components/LoginForm/LoginForm";
import {Route} from 'react-router-dom';

function GuestPage() {
    return (
        <>
            <GuestHeader/>
            <Container>
                <Route path="/login" component={LoginForm}/>
            </Container>           
        </>
    );
}

export default GuestPage;

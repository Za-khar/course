import React from 'react';
import GuestHeader from '../GuestHeader/GuestHeader';
import Container from '../../containers/Container';
import LoginForm from "./components/LoginForm/LoginForm";
import { Route, Redirect } from 'react-router-dom';

function GuestPage() {
    const [validate, setValidate] = React.useState(false);
    return (
        <>
            <GuestHeader />
            <Container>
                <Route path="/login" exact render={() => (
                    validate ? (
                        <Redirect to="/home" />
                    ) : (
                            <LoginForm setValidate={setValidate}/>
                        )
                )} />
            </Container>
        </>
    );
}

export default GuestPage;

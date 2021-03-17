import React from 'react';
import GuestHeader from '../GuestHeader/GuestHeader';
import LoginForm from "./components/LoginForm/LoginForm";
import { Route, Redirect } from 'react-router-dom';

function GuestPage() {
    const [validate, setValidate] = React.useState(false);
    return (
        <>
            <GuestHeader />
                <Route path="/login" exact render={() => (
                    validate ? (
                        <Redirect to="/home" />
                    ) : (
                            <LoginForm setValidate={setValidate}/>
                        )
                )} />
        </>
    );
}

export default GuestPage;

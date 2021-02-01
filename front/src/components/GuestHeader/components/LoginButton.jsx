import React from 'react';
import {Link} from 'react-router-dom';
import './LoginButton.css';

function LoginButton() {
    return(
        <Link className="login-button" to="/login">
            SignUp/SignIn
        </Link>
    );
}

export default LoginButton;
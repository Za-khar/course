import React from 'react';
import './LoginForm.css';
import {useHistory} from 'react-router-dom';

function LoginForm(){
    let history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        history.push('/home');
    };

    return (
        <div className="wrap-login">
            <form className="login-form">
                <span className="login-form-title">
                    Sing In With
                </span>
                <div className="social-login">
                    <a href="#" className="facebook-login">
                        Facebook
                    </a>
                    <a href="#" className="google-login">
                        Google
                    </a>
                </div>
                <div>
                    <span className="login-form__txt">
                        Username
                    </span>
                </div>
                <div>
                    <input className="login-form__input" type="text" name="username"/>
                </div>
                <div>
                    <span className="login-form__txt">
                        Password
                    </span>
                </div>
                <div>
                    <input className="login-form__input" type="password" name="pass"/>
                </div>
                <div className="container-login-form-btn">
                    <button className="login-form-btn" onClick={handleSubmit}>
                        Sing In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
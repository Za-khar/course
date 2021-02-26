import React from 'react';
import './LoginForm.css';
import { useHistory } from 'react-router-dom';
import SocialButton from './SocialButton';
import config from '../../../../Config.json';

import { socialAuth } from './hooks/socialAuth';

function LoginForm({setValidate}) {
    let history = useHistory();


    const handleSubmit = event => {
        event.preventDefault();
        history.push('/home');
    };

    const handleSocialLogin = async (user) => {
        console.log(user);
        try{
            const userData = await socialAuth(user);
            setValidate(true);
            console.log(userData);
        }
        catch (e) {
            console.log(e);
        }        
    };

    const handleSocialLoginFailure = (err) => {
        window.location.reload(); 
        console.error(err);
    };

    return (
        <div className="wrap-login">
            <span className="login-form-title">
                Sing In With
                </span>
            <div className="social-login">
                <SocialButton
                    className="facebook-login"
                    provider='facebook'
                    appId={config.FACEBOOK_CLIENT_ID}
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                >
                    Facebook
                     </SocialButton>
                <SocialButton
                    className="google-login"
                    provider='google'
                    appId={config.GOOGLE_CLIENT_ID}
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                >
                    Google
                     </SocialButton>
            </div>
            <form className="login-form">
                <div>
                    <span className="login-form__txt">
                        Username
                    </span>
                </div>
                <div>
                    <input className="login-form__input" type="text" name="username" />
                </div>
                <div>
                    <span className="login-form__txt">
                        Password
                    </span>
                </div>
                <div>
                    <input className="login-form__input" type="password" name="pass" />
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
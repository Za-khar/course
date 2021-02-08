import React from 'react';
import './MyProfile.css';
import Form from './components/Form';
import PropTypes from 'prop-types';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';

import SocialButton from '../../GuestPage/components/LoginForm/SocialButton';

import axios from 'axios';
import config from '../../../Config.json';

function MyProfile({ setUsername }) {
    const handleSocialLogin = (user) => {
        console.log(user);
        if (user._provider === 'google') {
            axios.post('http://localhost:3000/auth/social/google', user)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (user._provider === 'facebook') {
            axios.post('http://localhost:3000/auth/social/facebook', user)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleSocialLoginFailure = (err) => {
        window.location.reload();
        console.error(err);
    };

    return (
        <div className='profile'>
            <ErrorBoundary>
                <Form setUsername={setUsername} />
            </ErrorBoundary>

            <div className="social-login">
                <span>Link account with facebook account</span>
                <SocialButton
                    className="facebook-login"
                    provider='facebook'
                    appId={config.FACEBOOK_CLIENT_ID}
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                >
                    Facebook
                     </SocialButton>
                <span>Link account with google account</span>
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
        </div>
    );
}

MyProfile.propTypes = {
    setUsername: PropTypes.func.isRequired,
}

export default MyProfile;
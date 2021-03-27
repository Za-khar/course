import './MyProfile.css'

import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary'
import Form from './components/Form'
import PropTypes from 'prop-types'
import React from 'react'
import SocialButton from '../../GuestPage/components/LoginForm/SocialButton'
import config from '../../../Config.json'
import { socialAuth } from '../../GuestPage/components/LoginForm/hooks/socialAuth'

function MyProfile({ setUsername }) {
  const handleSocialLogin = async (user) => {
    try {
      const res = await socialAuth(user)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSocialLoginFailure = (err) => {
    window.location.reload()
    console.error(err)
  }

  return (
    <div className="profile">
      <ErrorBoundary>
        <Form setUsername={setUsername} />
      </ErrorBoundary>

      <div className="social-login">
        <span>Link account with facebook account</span>
        <SocialButton
          className="facebook-login"
          provider="facebook"
          appId={config.FACEBOOK_CLIENT_ID}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Facebook
        </SocialButton>
        <span>Link account with google account</span>
        <SocialButton
          className="google-login"
          provider="google"
          appId={config.GOOGLE_CLIENT_ID}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Google
        </SocialButton>
      </div>
    </div>
  )
}

MyProfile.propTypes = {
  setUsername: PropTypes.func.isRequired,
}

export default MyProfile

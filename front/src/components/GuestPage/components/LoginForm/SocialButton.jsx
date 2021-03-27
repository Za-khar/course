import React from 'react'
import SocialLogin from 'react-social-login'

function SocialButton({ children, triggerLogin, className }) {
  return (
    <button onClick={triggerLogin} className={className}>
      {children}
    </button>
  )
}

export default SocialLogin(SocialButton)

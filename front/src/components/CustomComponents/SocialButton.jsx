import Button from '@material-ui/core/Button'
import React from 'react'
import SocialLogin from 'react-social-login'

function SocialButton({ children, triggerLogin, className }) {
  return (
    <Button onClick={triggerLogin} className={className}>
      {children}
    </Button>
  )
}

export default SocialLogin(SocialButton)

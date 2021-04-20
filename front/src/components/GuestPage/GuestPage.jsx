import AuthForm from './components/AuthForm/AuthForm'
import GuestHeader from '../GuestHeader/GuestHeader'
import React from 'react'
import { Route } from 'react-router-dom'

function GuestPage() {
  return (
    <>
      <GuestHeader />
      <Route
        path="/login"
        exact
        sensitive
        strict
        render={() => (
          <AuthForm
            authUrl={'/auth/login'}
            socAuthUrl={'/auth/social-login'}
            isLogin={true}
          />
        )}
      />
      <Route
        path="/reg"
        exact
        sensitive
        strict
        render={() => (
          <AuthForm
            authUrl={'/auth/registration'}
            socAuthUrl={'/auth/social-reg'}
            isLogin={false}
          />
        )}
      />
    </>
  )
}

export default GuestPage

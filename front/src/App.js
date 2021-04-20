import './App.css'

import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import GuestPage from './containers/GuestPage'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import UserPage from './containers/UserPageContainer/UserPage'
import theme from './styles/colors'
import useAuth from './hooks/useAuth'

function App() {
  const { user, refreshToken, refresh, accessToken } = useAuth()

  useEffect(() => {
    if (!user && refreshToken) {
      refresh()
    }
  }, [user, refreshToken])

  if (!user && refreshToken) {
    return <div />
  }

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route
          path={'/home'}
          sensitive
          strict
          render={(props) =>
            user && refreshToken && accessToken ? (
              <UserPage />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
        <Route
          path="/(login|reg)?"
          exact
          sensitive
          render={(props) =>
            user && refreshToken && accessToken ? (
              <Redirect
                to={{
                  pathname: '/home',
                  state: { from: props.location },
                }}
              />
            ) : (
              <GuestPage />
            )
          }
        />
        <Route>Not Found</Route>
      </Switch>
    </ThemeProvider>
  )
}

export default App

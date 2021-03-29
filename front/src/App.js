import './App.css'

import { Route, Switch } from 'react-router-dom'

import GuestPage from './containers/GuestPage'
import React from 'react'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import UserPage from './containers/UserPageContainer/UserPage'
import theme from './styles/colors'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/home" component={UserPage} />
        <Route path="/" component={GuestPage} />
      </Switch>
    </ThemeProvider>
  )
}

export default App

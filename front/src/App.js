import React from 'react';
import './App.css';
import UserPage from './components/UserPage/UserPage';
import GuestPage from './containers/GuestPage';
import { Route, Switch } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './styles/colors';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/home" component={UserPage} />
        <Route path="/" component={GuestPage} />
      </Switch>
    </ThemeProvider> 
  );
}

export default App;

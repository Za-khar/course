import React from 'react';
import './App.css';
import UserPage from './components/UserPage/UserPage';
import GuestPage from './containers/GuestPage';
import {Route, Switch} from 'react-router-dom';
import UsersRoute from './containers/UsersRoute/UsersRoute';


function App() {
  return (
    <>
      <Switch>
        <Route path="/home" component={UserPage}/>
        <Route component={UsersRoute}></Route>
        <Route path="/" component={GuestPage}/>  
      </Switch>
    </>
  );
}

export default App;

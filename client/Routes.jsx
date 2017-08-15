import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';


import App from './components/App';
import Dashboard from './components/Dashboard';
import SignupPage from './components/Signup/SignupPage';
import SignInPage from './components/SignIn/SignInPage';


export default class Routes extends React.Component {
  render() {
    return(
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component = {Dashboard} />
          <Route path="/signup" component = {SignupPage} />
          <Route path="/signin" component = {SignInPage} />
        </Switch>
      </div>
    )
  }
}
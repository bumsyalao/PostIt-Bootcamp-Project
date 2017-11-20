import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignupPage from './components/Signup/SignupPage';
import SignInPage from './components/SignIn/SignInPage';
import Homepage from './components/Homepage';
import ConnectedForgotPassword from './components/SignIn/ForgotPassword';
import ConnectedResetPassword from './components/SignIn/ResetPassword';
import PageNotFound from './components/PageNotFound';

const Routes = () => (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/forgot-password" component={ConnectedForgotPassword} />
        <Route path="/reset-password" component={ConnectedResetPassword} />
        <Route path="/homepage" component={Homepage} />
        <Route component={PageNotFound}/>
      </Switch>
  );

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SignupPage from './components/Signup/SignupPage';
import SignInPage from './components/SignIn/SignInPage';
import Homepage from './components/Homepage';
import ForgotPassword from './components/SignIn/ForgotPassword';
import ResetPassword from './components/SignIn/ResetPassword';
import PageNotFound from './components/PageNotFound';

const Routes = () => (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/Sidebar" component={Sidebar}/>
        <Route path="/signup" component={SignupPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/homepage" component={Homepage} />
        <Route component={PageNotFound}/>
      </Switch>
  );

export default Routes;

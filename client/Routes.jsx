import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';


import App from './components/App';
import Dashboard from './components/Dashboard';
import SignupPage from './components/Signup/SignupPage';
import SignInPage from './components/SignIn/SignInPage';
import CreateGroup from './components/Group/CreateGroup';
import Homepage from './components/Homepage';
import ForgotPassword from './components/SignIn/ForgotPassword';
import ResetPassword from './components/SignIn/ResetPassword';

export default class Routes extends React.Component {
  render() {
    return(
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/Sidebar" component={Sidebar}/>
          <Route path="/signup" component={SignupPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/forgot-password" component={ForgotPassword} />
           {/* <Route path="/create/group" component={CreateGroup} />  */}
           <Route path="/reset-password/:hash" component={ResetPassword} />
          <Route path="/homepage" component={Homepage} />
        </Switch> 
    )
  }
}
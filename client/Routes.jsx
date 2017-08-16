import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';


import App from './components/App';
import Dashboard from './components/Dashboard';
import SignupPage from './components/Signup/SignupPage';
import SignInPage from './components/SignIn/SignInPage';
import CreateGroup from './components/Group/CreateGroup';


export default class Routes extends React.Component {
  render() {
    return(
      <div>
        {/* <Sidebar /> */}
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/Sidebar" component={Sidebar}/>
          <Route path="/signup" component={SignupPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/creategroup" component={CreateGroup} />
        </Switch> 
      </div>
    )
  }
}
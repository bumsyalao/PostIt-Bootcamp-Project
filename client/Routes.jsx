import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';


import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/Signup/SignupPage';
export default class Routes extends React.Component {
  render() {
    return(
      <div>
        <NavigationBar />
        <Switch>
          
          <Route path="/signup" component = {SignupPage} />
        </Switch>
      </div>
    )
  }
}
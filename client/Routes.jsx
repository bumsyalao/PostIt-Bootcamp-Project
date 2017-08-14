import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router-dom';


import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/Signup/SignupPage';
export default class Routes extends React.Component {
  render() {
    return(
      (
        <Switch>
        <Route exact path="/" component={App} /> 
        <Route path="/signup" component = {SignupPage} />
        </Switch>
      )
    )
  }
}
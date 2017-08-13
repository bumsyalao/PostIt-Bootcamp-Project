import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/Signup/SignupPage';

export default class Routes extends React.Component {
  render() {
    return(
      (
        <Route path ="/" component={App}> 
          <IndexRoute component ={Greetings}/>
          <Route path ="signup" component = {SignupPage} />
        </Route>
      )
    )
  }
}
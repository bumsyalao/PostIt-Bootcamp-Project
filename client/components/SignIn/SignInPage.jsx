import React from 'react';
import SignInForm from './signInForm';
// import { userSignInRequest } from '../../actions/SignInAction';
import NavigationBar from '../NavigationBar';


/**
 * @class SignInPage
 * @extends {React.Component}
 */
class SignInPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
      <NavigationBar match={this.props.match}/>
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignInForm />
      </div>
    </div>
    </div>
    );
  }
}

export default SignInPage;

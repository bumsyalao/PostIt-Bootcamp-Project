import React from 'react';
import SignInConnectedForm from './SignInForm';
import ConnectedNavigationBar from '../NavigationBar';


/**
 * @class SignInPage
 * @extends {React.Component}
 */
const SignInPage = ({ match }) => (
    <div>
      <ConnectedNavigationBar match={match}/>
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignInConnectedForm />
      </div>
    </div>
    </div>
);

export default SignInPage;

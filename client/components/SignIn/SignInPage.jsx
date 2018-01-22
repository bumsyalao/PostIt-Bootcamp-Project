import React from 'react';
import SignInForm from './SignInForm';
import NavigationBar from '../NavigationBar';


/**
 * @class SignInPage
 * @extends {React.Component}
 */
const SignInPage = ({ match }) => (
    <div>
      <NavigationBar match={match}/>
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignInForm />
      </div>
    </div>
    </div>
);

export default SignInPage;

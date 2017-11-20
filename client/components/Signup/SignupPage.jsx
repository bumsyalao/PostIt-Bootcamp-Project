import React from 'react';
import SignupConnectedForm from './SignupForm';
import ConnectedNavigationBar from '../NavigationBar';

const SignupPage = ({ match }) => (
  <div>
    <ConnectedNavigationBar match={match} />
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignupConnectedForm />
      </div>
    </div>
  </div>
);


export default SignupPage;

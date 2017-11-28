import React from 'react';
import SignupForm from './SignupForm';
import NavigationBar from '../NavigationBar';

const SignupPage = ({ match }) => (
  <div>
    <NavigationBar match={match} />
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignupForm />
      </div>
    </div>
  </div>
);


export default SignupPage;

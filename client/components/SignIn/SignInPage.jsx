import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInForm from './signInForm';
import { userSignInRequest } from '../../actions/SignInAction';
import NavigationBar from '../NavigationBar';

class SignInPage extends React.Component {
  render() {
    const userSignIn = this.props.userSignInRequest;
    return (
    <div>
      <NavigationBar />
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <SignInForm userSignInRequest={userSignIn} />
      </div>
    </div>
    </div>
    );
  }
}

SignInPage.propTypes = {
  userSignInRequest: PropTypes.func.isRequired
};

export default SignInPage;
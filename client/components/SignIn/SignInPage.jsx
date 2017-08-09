import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignInForm from './signInForm';
import { userSignInRequest } from '../../actions/signInActions';

class SignInPage extends React.Component {
  render() {
    const userSignIn = this.props.userSignInRequest;
    return (
      <div className="row">
        <SignInForm userSignInRequest={userSignIn} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  userSignInRequest: PropTypes.func.isRequired
};

export default withRouter(connect(null, { userSignInRequest })(SignInPage));
I
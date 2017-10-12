import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import userSignupRequest from '../../actions/signupAction';
import NavigationBar from '../NavigationBar';


/**
 * @class SignupPage
 * @extends {React.Component}
 */
class SignupPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div>
        <NavigationBar match={this.props.match} />
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <SignupForm userSignupRequest={userSignupRequest} />
          </div>
        </div>
      </div>
    );
  }
}
SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(SignupPage);

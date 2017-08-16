import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupAction';
import NavigationBar from '../NavigationBar';


class SignupPage extends React.Component {
  constructor(props){
    super(props)
  }
    render() {
        const { userSignupRequest, addFlashMessage } = this.props;
        return (
          <div>
            <NavigationBar />
            <div className="row">
               <div className="col-md-4 col-md-offset-4">
                   <SignupForm userSignupRequest={userSignupRequest} />
                </div>
            </div> 
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userSignupRequest:(user) => dispatch(userSignupRequest(user))
  }
};

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(SignupPage);

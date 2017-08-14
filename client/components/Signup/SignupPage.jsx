import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupAction';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest} = this.props;
        return (
            <div className="row">
               <div className="col-md-4 col-md-offset-4">
                   <SignupForm userSignupRequest={userSignupRequest} />
                </div>
            </div> 
        );
    }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  
}
const mapDispatchToProps = (dispatch) => {
  return {
    userSignupRequest:(user) => dispatch(userSignupRequest(user))
  }
};

export default connect(null, mapDispatchToProps)(SignupPage);
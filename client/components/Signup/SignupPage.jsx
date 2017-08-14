import React from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupAction';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
  constructor(props){
    super(props)
  }
    render() {
        const { userSignupRequest, addFlashMessage } = this.props;
        return (
            <div className="row">
               <div className="col-md-4 col-md-offset-4">
                   <SignupForm userSignupRequest={userSignupRequest} addFlashMessage ={addFlashMessage}/>
                </div>
            </div> 
        );
    }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}


export default connect(null, {userSignupRequest}) (SignupPage);
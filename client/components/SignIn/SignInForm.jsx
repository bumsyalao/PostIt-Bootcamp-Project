/* global Materialize */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { userSignInRequest } from '../../actions/SignInAction';
import ForgotPassword from './ForgotPassword';





class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onSubmit() {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.userSignInRequest(data)
      .then(() => {
        if(this.props.access.message){
          this.props.history.push('/homepage');
          Materialize.toast('Login Succesful', 5000, 'green');
        } else {
          Materialize.toast('Login Failed', 5000, 'red');
        }
      })
      .catch(err => Materialize.toast(err.response.data.message, 5000, 'red'))
  }

  render() {

    return (
      <div className="form-margin">
        <div className="col s12 container">
          <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">account_circle</i>
              <input id ="username" value={this.state.username} onChange={this.onChange} name="username"  type="text" 
              className="validate" required/>
              <label className="active" htmlFor="credential">username</label>
            </div>
            <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">lock</i>
              <input id="password" value={this.state.password} onChange={this.onChange} name="password"type="password" 
              className="validate" required/>
              <label className="active" htmlFor="password">password</label>
            </div>
          <button 
            onClick={this.onSubmit}
            className="btn waves-effect waves-light col s6 offset-s3 red lighten-2"
            name="action">Login
            <i className="material-icons right">send</i>
          </button>
        </div>
        <div className="col s6 offset-s3"> 
          <Link to ="/forgot-password"> 
            Forgot Password
          </Link>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => (
  {
    access: state.access
  }
);

SignInForm.propTypes = {
  userSignInRequest: PropTypes.func.isRequired
};


export default connect(mapStateToProps , {userSignInRequest})(withRouter(SignInForm));

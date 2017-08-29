import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPasswordAction } from '../../actions/SignInAction';
import NavigationBar from '../NavigationBar';

class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: ''
    }
    this.onChange = this.onChange.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  forgotPassword(event)  {
    const email = this.state.email;
    this.props.forgotPasswordAction({email})
      .then(() => {
          this.props.history.push('/');
          Materialize.toast('Password Reset Link sent', 5000, 'green');

      })
      .catch(error => {
        console.log(error);
        Materialize.toast('Server Error', 5000, 'red');
      })
  }
  render(){

    return (
      <div>
      <NavigationBar match={this.props.match}/>
      <div className="form-margin">
        <div className="col s12 container">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              value={this.state.email}
              onChange={this.onChange}
              name="email"
              type="text"
              className="validate"
              required
            />
            <label className="active" htmlFor="credential">
              Type in your email address so we can send you instructions to reset your password
            </label>
          </div>
          <div className="input-field col s6 offset-s3">
            <button
              onClick={this.forgotPassword}
              className="btn waves-effect waves-light col s6 offset-s3 red lighten-2"
              name="action"
            >
              Send
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
      </div>
    );
  };
}


export default connect(null, {forgotPasswordAction})(ForgotPassword);
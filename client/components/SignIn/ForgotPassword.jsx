import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forgotPasswordAction } from '../../actions/signInAction';
import NavigationBar from '../NavigationBar';

/**
 * @class ForgotPassword
 * @extends {Component}
 */
export class ForgotPassword extends Component {

  /**
   * Creates an instance of ForgotPassword.
   * Bind class methods
   * @param {object} props
   *
   * @memberOf ForgotPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.onChange = this.onChange.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  /**
   *
   * Sets the event value to the state
   * @param {object} event
   *
   * @memberOf ForgotPassword
   */
  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /**
   * Makes an action call to get forgotPasswordAction
   * Toast Success/error message
   *
   * @memberOf ForgotPassword
   */
  forgotPassword() {
    const email = this.state.email;
    this.props
      .forgotPasswordAction({ email })
      .then(() => {
        this.props.history.push('/');
        Materialize.toast('Password Reset Link sent', 5000, 'green');
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 5000, 'red');
      });
  }

  /**
   *
   * Renders ForgotPassword Component
   * @returns ForgotPassword HTML component
   *
   * @memberOf ForgotPassword
   */
  render() {
    return (
      <div>
        <NavigationBar match={this.props.match} />
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
                Type in your email address so we can send you instructions to
                reset your password
              </label>
            </div>
            <div className="input-field col s6 offset-s3">
              <button
                id="submit-forgotPassword"
                onClick={this.forgotPassword}
                className=
                "btn waves-effect waves-light col s6 offset-s3 red lighten-2"
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
  }
}

export default connect(null, { forgotPasswordAction })(ForgotPassword);

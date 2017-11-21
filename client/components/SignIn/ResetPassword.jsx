import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConnectedNavigationBar from '../NavigationBar';
import { resetPasswordAction } from '../../actions/signInAction';

/**
 * @class ResetPassword
 * @extends {Component}
 */
export class ResetPassword extends Component {
  /**
   * Creates an instance of ResetPassword.
   * Binds class methods
   * @param {object} props
   *
   * @memberOf ResetPassword
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: ''
    };
    this.onChange = this.onChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  /**
   *
   * Sets the event value to the state
   * @param {Object} event The event of the HTML component
   *
   * @memberOf ResetPassword
   */
  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /**
   * Gets the password
   * Gets the hash
   * Makes an action call to get resetPasswordAction
   * Toasts the error/success message
   *
   * @memberOf ResetPassword
   */
  resetPassword() {
    const password = this.state.password;
    const pathname = this.props.location.pathname;
    const hash = pathname.replace('/reset-password/', '');
    this.props.resetPasswordAction({ password, hash })
      .then(() => {
        this.props.history.push('/homepage/welcome-page');
        Materialize.toast('Password Updated Succesfully', 5000, 'green');
      })
      .catch(err => Materialize.toast(err.response.data.message, 5000, 'red'));
  }

  /**
   *
   * Renders ResetPassword Component
   * @returns ResetPassword HTML component
   *
   * @memberOf ResetPassword
   */
  render() {
    return (
      <div>
        <ConnectedNavigationBar match={this.props.match} />
        <div className="form-margin">
          <div className="col s12 container">
            <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">lock</i>
              <input
                id="password"
                value={this.state.password}
                onChange={this.onChange}
                name="password"
                type="password"
                className="validate"
                required
              />
              <label className="active" htmlFor="password">
                password
              </label>
            </div>
            <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">lock</i>
              <input
                id="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.onChange}
                name="confirmPassword"
                type="password"
                className="validate"
                required
              />
              <label className="active" htmlFor="confirmPassword">
                confirm password
              </label>
            </div>
            <div className="input-field col s6 offset-s3">
              <button
                id="resetPassword"
                onClick={this.resetPassword}
                className=
                "btn waves-effect waves-light col s6 offset-s3 red lighten-2"
                name="action"
              >
                Reset Password
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(null, { resetPasswordAction })(ResetPassword)
);

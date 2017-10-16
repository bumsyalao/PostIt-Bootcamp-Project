import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import NavigationBar from '../NavigationBar';
import { resetPasswordAction } from '../../actions/SignInAction';


/**
 *
 *
 * @class ResetPassword
 * @extends {Component}
 */
class ResetPassword extends Component {

  /**
   * Creates an instance of ResetPassword.
   * @param {any} props
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
   *
   * @param {any} event
   *
   * @memberOf ResetPassword
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *
   *
   * @param {any} event
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
   *
   * @returns
   *
   * @memberOf ResetPassword
   */
  render() {
    return (
      <div>
      <NavigationBar match={this.props.match}/>
      <div className="form-margin">
        <div className="col s12 container">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">lock</i>
            <input
            value={this.state.password}
            onChange={this.onChange}
            name="password"
            type="password"
            className="validate"
            required/>
            <label className="active" htmlFor="password">password</label>
          </div>
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">lock</i>
            <input
            value={this.state.confirmPassword}
            onChange={this.onChange}
            name="confirmPassword"
            type="password"
            className="validate"
            required/>
            <label className="active" htmlFor="confirmPassword">confirm password</label>
          </div>
          <div className="input-field col s6 offset-s3">
            <button
              onClick={this.resetPassword}
              className="btn waves-effect waves-light col s6 offset-s3 red lighten-2"
              name="action">
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
  connect(null, { resetPasswordAction })(ResetPassword));

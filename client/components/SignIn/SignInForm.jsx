/* global Materialize */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignInRequest } from '../../actions/SignInAction';

/**
 * @class SignInForm
 * @extends {React.Component}
 */
class SignInForm extends React.Component {
  /**
   * Creates an instance of SignInForm.
   * Binds class methods.
   * @param {any} props
   *
   * @memberOf SignInForm
   */
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
    /**
   *
   * Check if user is authenticated
   * Directs user to homepage if user is already signed in
   *
   * @memberOf Homepage
   */
  componentDidMount() {
    if (this.props.access.isAuthenticated) {
      this.props.history.push('/homepage/welcome-page');
    }
  }
  /**
   * Sets the event value to the state
   * @return {void}
   * @param {Object} event The event of the HTML component
   *
   * @memberOf SignInForm
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  /**
   * Validates the SignInForm
   * Makes an action call to sign in the user
   * Toasts the error/success message
   * @return {void}
   *
   * @memberOf SignInForm
   */
  onSubmit() {
    const SigninInfo = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.userSignInRequest(SigninInfo)
      .then((res) => {
        if (this.props.access.message) {
          this.props.history.push('/homepage/welcome-page');
          Materialize.toast(res.message, 5000, 'green');
        } else {
          Materialize.toast(`Login Failed: ${res.response.data.message}`, 5000, 'red');
        }
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 5000, 'red');
      });
  }

  /**
   *
   * Renders SignInForm component
   * @returns SignInForm HTML component
   *
   * @memberOf SignInForm
   */
  render() {
    return (
      <div className="form-margin">
      <div><h3 className="form-header">LOGIN</h3></div>
        <div className="col s12 container">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="username"
              value={this.state.username}
              onChange={this.onChange}
              name="username"
              type="text"
              className="validate"
              required
            />
            <label className="active" htmlFor="credential">
              username
            </label>
          </div>
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
          <button
            onClick={this.onSubmit}
            id="submit-signin"
            className=
            "btn waves-effect waves-light col s6 offset-s3 red lighten-2"
            name="action"
          >
            Login<i className="material-icons right">send</i>
          </button>
        </div>
        <div className="col s6 offset-s3 forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access: state.access
});

SignInForm.propTypes = {
  userSignInRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { userSignInRequest })(
  withRouter(SignInForm)
);

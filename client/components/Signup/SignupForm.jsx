import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import userSignupRequest from '../../actions/signupAction';


/**
 * @class SignupForm
 * @extends {React.Component}
 */
export class SignupForm extends React.Component {

  /**
   * Creates an instance of SignupForm.
   * Binds class methods.
   * @param {object} props
   *
   * @memberOf SignupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      confirmPassword: '',
      loggedIn: false
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
   * @memberOf SignupForm
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   *
   * Validates the SignupForm
   * Makes an action call to sign up the user
   * Toasts the error/success message
   * @return {void}
   * @param {object} event
   *
   * @memberOf SignupForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.confirmPassword !== this.state.password) {
      Materialize.toast('Password does not match', 5000, 'red');
      this.props.history.push('/signup');
    } else {
      this.props.userSignupRequest(this.state)
      .then(() => {
        this.setState({ loggedIn: true });
        this.props.history.push('/homepage/welcome-page');
      })
      .catch((error) => {
        Materialize.toast(error.response.data.message, 5000, 'red');
      });
    }
  }

  /**
   *
   * renders signupForm component
   * @returns signupform
   * @memberOf SignupForm
   */

  render() {
    return (
      <div className="form-margin">
        <form className="col s12 container">
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
            <label className="active" htmlFor="username">
              username
            </label>
          </div>
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              value={this.state.email}
              onChange={this.onChange}
              name="email"
              type="email"
              className="validate"
              required
            />
            <label className="active" htmlFor="email">
              email
            </label>
          </div>
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">phone</i>
            <input
              id="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.onChange}
              name="phoneNumber"
              type="tel"
              className="validate"
              required
            />
            <label className="active" htmlFor="icon_telephone">
              phone number
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
          <button
            onClick={this.onSubmit}
            id="submit-signup"
            className=
            "btn waves-effect waves-light col s6 offset-s3 red lighten-2"
            type="submit"
            name="action"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}


export default connect(null, { userSignupRequest })(withRouter(SignupForm));

/* global Materialize */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import isEmail from '../../utils/helper';

import { connect } from 'react-redux';
import { userSignInRequest } from '../../actions/SignInAction';





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
  onSubmit(event) {
    event.preventDefault();
    const data = {};
    if (this.state.username) {
      data.username = this.state.username;
      data.password = this.state.password;
    } else {
      data.username = this.state.username;
      data.password = this.state.password;
    }
    this.props.userSignInRequest(data)
      .then(() => {
        debugger;
        this.setState({ loggedIn: true });
        this.props.history.push('/');
        console.log(this.props.access);
      }).catch(() => {
        debugger;
        Materialize.toast('failure', 3000, 'red');
      });
  }

  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <div className="form-margin">
        <form className="col s12 container">
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
          <button onClick={this.onSubmit} disabled={this.state.invalid} className="btn waves-effect waves-light col s6 offset-s3 red lighten-2" type="submit" name="action">Login
            <i className="material-icons right">send</i>
          </button>
        </form>
       <div className="col s6 offset-s3"> <a href="forgot.html">Forgot Password?</a> </div>
      </div>
    );
  }
}


const mapPropsToState = state => (
  {
    access: state.access
  }
);

SignInForm.propTypes = {
  userSignInRequest: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired
};


export default connect(mapPropsToState , {userSignInRequest})(withRouter(SignInForm));

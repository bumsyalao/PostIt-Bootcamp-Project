import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password:'',
      phonenumber:'',
      confirmPassword:'',
      invalid: false
    }
    this.state = { loggedIn: false};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state)
      .then(() => {
        this.setState({ loggedIn: true });
        this.props.history.push('/homepage');
      })
  }
    render() {
      {this.state.loggedIn && <Redirect to="/" />}
      return (
        <div className="form-margin">
        <form className="col s12 container">
          <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">account_circle</i>
              <input value={this.state.username} onChange={this.onChange} name="username"  type="text" 
              className="validate" required/>
              <label className="active" htmlFor="username">username</label>
            </div>
            <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">email</i>
              <input value={this.state.email} onChange={this.onChange} name="email" type="email" 
              className="validate" required/>
              <label className="active" htmlFor="email">email</label>
            </div>
            <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">phone</i>
              <input value={this.state.phonenumber} onChange={this.onChange} name="phonenumber"type="tel" class="validate" required/>
              <label className="active" htmlFor="icon_telephone">phone number</label>
            </div>
            <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">lock</i>
              <input value={this.state.password} onChange={this.onChange} name="password"type="password" 
              className="validate" required/>
              <label className="active" htmlFor="password">password</label>
            </div>
            <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">lock</i>
              <input value={this.state.confirmPassword} onChange={this.onChange} name="confirmPassword" type="password" 
              className="validate" required/>
              <label className="active" htmlFor="confirmPassword">confirm password</label>
            </div>
          <button onClick={this.onSubmit} disabled={this.state.invalid} className="btn waves-effect waves-light col s6 offset-s3 red lighten-2" type="submit" name="action">Register
            <i className="material-icons right">send</i>
          </button>
        </form>
        </div>
      );
    }
  }


SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
}

export default withRouter(SignupForm);
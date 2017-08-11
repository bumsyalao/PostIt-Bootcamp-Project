import React from 'react';
import PropTypes from 'prop-types';

 

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password:'',
      confirmPassword:''
    }
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
        this.props.addFlashMessage({
          type: 'success',
          text:'Sign up Successful! Wlcome'
        })
      }).catch((err) => {
        Materialize.toast(err, 3000, 'red');
      });
  }
    render() {
      return (
        <form onSubmit={this.onSubmit} class="col s12">
          <div className="input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input 
              value={this.state.username} 
              onChange={this.onChange} 
              name="username"  
              type="text" 
              className="validate"/>
              <label className="active" htmlFor="username">username</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">email</i>
              <input 
              value={this.state.email} 
              onChange={this.onChange} 
              name="email" 
              type="email" 
              className="validate"/>
              <label className="active" htmlFor="email">email</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">vpn_key</i>
              <input 
              value={this.state.password} 
              onChange={this.onChange} 
              name="password"
              type="password" 
              className="validate"/>
              <label className="active" htmlFor="password">password</label>
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">vpn_key</i>
              <input 
              value={this.state.confirmPassword}
              onChange={this.onChange} 
              name="password" 
              type="password" 
              className="validate"/>
              <label className="active" htmlFor="password">confirm password</label>
            </div>
          <button className="btn waves-effect waves-light col s6 red lighten-2" type="submit" name="action">Register
            <i className="material-icons right">send</i>
          </button>
          
        </form>
      );
    }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default SignupForm;
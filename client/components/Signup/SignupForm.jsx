import React from 'react';


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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state)
    
  }
    render() {
        return (
            <form onSubmit={this.onSubmit} class="col s12">

              
                <div className="form-group">
                  <i className="material-icons prefix">account_circle</i>
                  <input 
                  value={this.state.username} 
                  onChange={this.onChange} 
                  name="username"  
                  type="text" 
                  className="form-control"/>
                </div>
                <div className="form-group">
                  <i className="material-icons prefix">email</i>
                  <input 
                  value={this.state.email} 
                  onChange={this.onChange} 
                  name="email" 
                  type="email" 
                  className="form-control"/>
                </div>
                <div className="form-group">
                  <i className="material-icons prefix">vpn_key</i>
                  <input 
                  value={this.state.password} 
                  onChange={this.onChange} 
                  name="password"
                  type="password" 
                  className="form-control"/>
                </div>
                <div className="form-group">
                  <i className="material-icons prefix">vpn_key</i>
                  <input 
                  value={this.state.confirmPassword}
                  onChange={this.onChange} 
                  name="password" 
                  type="password" 
                  className="form-control"/>
                </div>
              <button className="btn waves-effect waves-light col s6 red lighten-2" type="submit" name="action">Register
                <i className="material-icons right">send</i>
              </button>
              
            </form>
        );
    }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
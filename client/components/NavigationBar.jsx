import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logout from '../actions/SignInAction';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  componentWillMount() {
    this.setState({
      user: this.props.isAuth
    })
  }
  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  render() {
    const { user } = this.state;
    return (
      <div>
    {Object.keys(user).length === 0 ? 
      <nav>
          <div className="nav-wrapper container">
              <Link to="/">
              <a id="logo-container" className="brand-logo">POST-IT</a>
              </Link>
            <ul className="right">
              <li><Link to="/signin">Login</Link></li>
            </ul>
            <ul className="right">
              <li><Link to="/signup">Register</Link></li>
            </ul>
            <ul id="nav-mobile" className="side-nav">
              <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
          </div>
        </nav>
        :
        <nav>
          <div className="nav-wrapper container">
            <ul className="right">
              <li><a href="#" onClick={this.logout.bind(this)}></a></li>
            </ul>
            <ul id="nav-mobile" className="side-nav">
              <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
          </div>
        </nav> }
        </div>
    )
  }
  
}
NavigationBar.proptypes = {
  logout: React.PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.access.user
  }
}
export default connect(mapStateToProps, { logout })(NavigationBar);
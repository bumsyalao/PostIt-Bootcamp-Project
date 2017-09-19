import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/SignInAction';
import { withRouter } from 'react-router-dom';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.logout = this.logout.bind(this);
  }
  /**
   * 
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        user: this.props.isAuth
      });
    }
  }

  componentDidMount() {
    this.setState({
      user: this.props.isAuth
    });
  }
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }
  /**
   * c
   */
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper container">
            <Link to="/">
              <a id="logo-container" className="brand-logo">
                POST-IT
              </a>
            </Link>
            {this.props.match.url === '/' && (
              <ul className="right">
                <li>
                  <Link to="/signin">Login</Link>
                </li>
              </ul>
            )}
            {this.props.match.url === '/signup' && (
              <ul className="right">
                <li>
                  <Link to="/signin">Login</Link>
                </li>
              </ul>
            )}
            {this.props.match.url === '/' && (
              <ul className="right">
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </ul>
            )}
            {this.props.match.url === '/signin' && (
              <ul className="right">
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </ul>
            )}
            {this.props.match.url === '/homepage' && (
              <ul className="right">
                <li>
                  <a onClick={this.logout}>LOG OUT</a>
                </li>
              </ul>
            )}
            <a href="#" data-activates="nav-mobile" className="button-collapse">
              <i className="mdi-navigation-menu" />
            </a>
          </div>
        </nav>
      </div>
    );
  }
}
NavigationBar.propTypes = {
  logout: React.PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    isAuth: state.access.user
  };
};
export default connect(mapStateToProps, { logout })(withRouter(NavigationBar));

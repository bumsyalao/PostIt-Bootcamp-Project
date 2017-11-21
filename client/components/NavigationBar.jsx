import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../actions/signInAction';

/**
 * @class NavigationBar
 * @extends {React.Component}
 */
export class NavigationBar extends React.Component {
  /**
   * Creates an instance of NavigationBar.
   * @param {object} props
   *
   * @memberOf NavigationBar
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.logout = this.logout.bind(this);
  }
  /**
   * Update the state if the props are changed
   * @param {object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        user: this.props.isAuth
      });
    }
  }

  /**
   * Updates the state.
   * @memberOf NavigationBar
   */
  componentDidMount() {
    this.setState({
      user: this.props.isAuth
    });
  }

  /**
   * Prevent default action of event
   *
   * @param {object} event
   *
   * @memberOf NavigationBar
   */
  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  /**
   * Renders NavigationBar
   * @returns Navigationbar
   * @memberOf NavigationBar
   */
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper container">
            <Link to="/" id="logo-container" className="brand-logo">
              POST-IT
            </Link>
            {this.props.match.url === '/' && (
              <ul className="right">
                <li>
                  <Link to="/signin">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Register</Link>
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
            {this.props.match.url === '/signin' && (
              <ul className="right">
                <li>
                  <Link to="/signup">Register</Link>
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

const mapStateToProps = state => ({
  isAuth: state.access.user
});
export default connect(mapStateToProps, { logout })(withRouter(NavigationBar));

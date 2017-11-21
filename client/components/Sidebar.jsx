import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import gender from '../images/gender-neutral copy.png';
import { logout } from '../actions/signInAction';

export class Sidebar extends Component {
  /**
   * Creates an instance of NavigationBar.
   * @param {object} props
   *
   * @memberOf NavigationBar
   */
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
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
    Materialize.toast('You have logged out successfully', 3000, 'green');
  }
  render() {
    return (
      <div>
      <a href="#" className="trigger"><i className="material-icons">menu</i></a>
        <ul id="slide-out" className="side-nav fixed #e57373 red lighten-2">
          <li>
            <div className="user-view">
              <div className="side-logo center">
                <img src={gender} width="80%" height="80%" />
                <h5> POST-IT </h5>
              </div>
            </div>
          </li>
          <ul className="collapsible " data-collapsible="accordion">
            <li>
              <div className="collapsible-header" id="document-header">
                <i className="material-icons">group</i>Groups
              </div>
              <div
                className="collapsible-body #ffebee red lighten-5"
                id="groups"
              >
                <ul>
                  <li>
                    <Link to="/homepage/create-group" id="create-group">
                      <i className="material-icons">group_add</i>
                      Create Group
                    </Link>
                  </li>
                  <li>
                    <Link to="/homepage/groups">
                      <i className="material-icons">groups</i>
                      All Groups
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul className="collapsible " data-collapsible="accordion">
            <li>
              <div className="collapsible-header" id="document-header">
                <i className="material-icons">person</i>Users
              </div>
              <div
                className="collapsible-body #ffebee red lighten-5"
                id="groups"
              >
                <ul>
                  <li>
                    <Link to="/homepage/user-profile" id="create-group">
                      <i className="material-icons">face</i>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/homepage/search-users">
                      <i className="material-icons">search</i>
                      Search User
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul className="collapsible " data-collapsible="accordion">
            <li>
              <div className="collapsible-header" id="document-header">
                <i className="material-icons">power_settings_new</i>
                <a href="#" onClick={this.logout}>
                  Log Out{' '}
                </a>
              </div>
            </li>
          </ul>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.access.user
});

export default connect(mapStateToProps, { logout })(withRouter(Sidebar));

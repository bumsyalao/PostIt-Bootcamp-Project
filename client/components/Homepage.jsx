import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import CreateGroup from './Group/CreateGroup';
import ListGroup from './Group/ListGroup';
import GroupChat from './Group/GroupChat';
import UsersPage from '../components/Users/UsersPage';
import UserProfile from '../components/Users/UserProfile';
import Welcomepage from './Welcomepage';


/**
 * @class Homepage
 * @extends {React.Component}
 */
class Homepage extends React.Component {

  /**
   *
   * Check if user is authenticated
   * Toast access message
   * Intialize materialize collapsible
   *
   * @memberOf Homepage
   */
  componentDidMount() {
    if (!this.props.access.isAuthenticated) {
      this.props.history.push('/signin');
      Materialize.toast('Please SignIn or Register', 5000, 'red');
    }
    $('.collapsible').collapsible(); // eslint-disable-line
  }

  /**
   * Renders Homepage
   * @returns Homepage
   * @memberOf Homepage
   */
  render() {
    return (
      <div>
        <Sidebar />
        <div className="homepage">
          <NavigationBar match={this.props.match} />
          <Switch>
            <Route
              path={`${this.props.match.url}/welcome-page`}
              component={Welcomepage}
            />
            <Route
              path={`${this.props.match.url}/create-group`}
              component={CreateGroup}
            />
            <Route
              path={`${this.props.match.url}/groups`}
              component={ListGroup}
            />
            <Route
              path={`${this.props.match.url}/view-group/:groupId`}
              component={GroupChat}
            />
            <Route
              path={`${this.props.match.url}/search-users`}
              component={UsersPage}
            />
            <Route
              path={`${this.props.match.url}/user-profile`}
              component={UserProfile}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    access: state.access
  }
);

export default connect(mapStateToProps, null)(withRouter(Homepage));


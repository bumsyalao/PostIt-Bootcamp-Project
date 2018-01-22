import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import CreateGroup from './Group/CreateGroup';
import Sidebar from './Sidebar';
import ListGroup from './Group/ListGroup';
import GroupChat from './Group/GroupChat';
import UsersPage from '../components/Users/UsersPage';
import UserProfile from '../components/Users/UserProfile';
import Welcomepage from './Welcomepage';
import PageNotFound from './PageNotFound';
import SearchUser from '../components/Group/SearchUser';
import GroupUsers from '../components/Group/GroupUsers';

/**
 * @class Homepage
 * @extends {React.Component}
 */
export class Homepage extends React.Component {

  /**
   *
   * Check if user is authenticated
   * Toast access message
   * Intialize materialize collapsible
   *
   * @memberOf Homepage
   */
  componentDidMount() {
    $('.collapsible').collapsible();
    if (!this.props.access.isAuthenticated) {
      this.props.history.push('/signin');
      Materialize.toast('Please SignIn or Register', 5000, 'red');
    }
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
            <Route
              path={`${this.props.match.url}/group/:groupId/add-user`}
              component={SearchUser}
            />
            <Route
              path={`${this.props.match.url}/group/:groupid/group-users`}
              component={GroupUsers}
            />
            <Route component={PageNotFound}/>
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


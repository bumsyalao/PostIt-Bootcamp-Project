import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ConnectedCreateGroup from './Group/CreateGroup';
import ConnectedSidebar from './Sidebar';
import ConnectedListGroup from './Group/ListGroup';
import ConnectedGroupChat from './Group/GroupChat';
import ConnectedUsersPage from '../components/Users/UsersPage';
import ConnectedUserProfile from '../components/Users/UserProfile';
import Welcomepage from './Welcomepage';
import PageNotFound from './PageNotFound';
import ConnectedSearchUser from '../components/Group/SearchUser';


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
        <ConnectedSidebar />
        <div className="homepage">

          <Switch>
            <Route
              path={`${this.props.match.url}/welcome-page`}
              component={Welcomepage}
            />
            <Route
              path={`${this.props.match.url}/create-group`}
              component={ConnectedCreateGroup}
            />
            <Route
              path={`${this.props.match.url}/groups`}
              component={ConnectedListGroup}
            />
            <Route
              path={`${this.props.match.url}/view-group/:groupId`}
              component={ConnectedGroupChat}
            />
            <Route
              path={`${this.props.match.url}/search-users`}
              component={ConnectedUsersPage}
            />
            <Route
              path={`${this.props.match.url}/user-profile`}
              component={ConnectedUserProfile}
            />
            <Route
              path={`${this.props.match.url}/group/:groupId/add-user`}
              component={ConnectedSearchUser}
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


import React from 'react';
import { Route, IndexRoute, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import CreateGroup from './Group/CreateGroup';
import ListGroup from './Group/ListGroup';
import GroupChat from './Group/GroupChat';
import UsersPage from '../components/Users/UsersPage';
import welcome from '../images/welcome.png';

class Homepage extends React.Component {
  componentDidMount() {
    if (!this.props.access.isAuthenticated) {
      this.props.history.push('/signin');
      Materialize.toast('Please SignIn or Register', 5000, 'red');
    }
    $('.collapsible').collapsible();
  }
  render() {
    return (
      <div>
        <Sidebar />
        <div className="homepage">
          <NavigationBar match={this.props.match} />
          <Switch>
            <Route
              path={`${this.props.match.url}/create/group`}
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
          </Switch>
        </div>
        <div className="center">
        <img
          src="http://25.media.tumblr.com/2eec31196ac2c821109a74bd74756eb1/tumblr_mxkc6hIQ9S1sy7jhao1_500.gif" />
        <div>
        </div>
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


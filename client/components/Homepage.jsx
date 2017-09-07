import React from 'react';
import { Route, IndexRoute, Switch } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import CreateGroup from './Group/CreateGroup';
import ListGroup from './Group/ListGroup';
import GroupChat from './Group/GroupChat';
import UsersPage from '../components/Users/UsersPage';



export default class Homepage extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    $('.collapsible').collapsible();
  }
  render() {

    return(
      <div>
        <Sidebar />
        <div className="homepage">
          <NavigationBar match={this.props.match}/>
          <Switch>
            <Route path={`${this.props.match.url}/create/group`} component={CreateGroup} />
            <Route path={`${this.props.match.url}/groups`} component={ListGroup} />
            <Route path={`${this.props.match.url}/view-group/:groupId`} component={GroupChat} />
            <Route path={`${this.props.match.url}/search-users`} component={UsersPage} />
          </Switch>
        </div>
      </div>
    )
  }
  
}
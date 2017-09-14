import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import addMemberToGroup from '../../actions/createGroupRequest';
import { getMessages } from '../../actions/messages';
import { getGroups, listAllUsers, removeGroup } from '../../actions/groups';
import GroupCard from './GroupCard';
import GroupChat from './GroupChat';


class ListGroup extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.listUsers = this.listUsers.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  componentDidMount() {
    this.props.getGroups();
  }

  onClick(id) {
    this.props.history.push(`/homepage/view-group/${id}`);
  }

  joinGroup(event) {
    event.preventDefault();
    const id = event.target.id;
    this.props
      .addMemberToGroup(id)
      .then(() => {
        Materialize.toast('Member successfully added', 5000, 'green');
      })
      .catch(({ response }) => {
        Materialize.toast(
          `An error occured: ${response.data.message}`,
          5000,
          'red'
        );
      });
  }

  listUsers(groupId) {
    const { users } = this.props;
    if (users && users.length > 0) return;
    console.log(this.props.users);
    this.props
      .listAllUsers(groupId)
      .then(() => {})
      .catch((error) => {
        Materialize.toast(`An error occured: ${error.message}`, 5000, 'red');
      });
  }

  deleteGroup(event) {
    this.props.removeGroup(event.target.id)
      .then(() => {
        console.log('HI');
      });
  }

  render() {
    return (
      <div>
        <div className="row form-margin">
          <div className="col s12 m12 l12">
            {this.props.groupList.map(group => (
              <GroupCard
                key={group.id}
                id={group.id}
                onClick={() => this.onClick(group.id)}
                joinGroup={this.joinGroup}
                {...group}
                users={group.users}
                listUsers={this.listUsers}
                deleteGroup={this.deleteGroup}
              />
            ))}
          </div>
          <div className="col s12 m12 l12">
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  group: state.group.group,
  groupList: state.group.groupList,
  messages: state.group.groupMessages,
  users: state.group.users
});

const actions = {
  getGroups,
  getMessages,
  addMemberToGroup,
  listAllUsers,
  removeGroup
};

export default connect(mapStateToProps, actions)(ListGroup);

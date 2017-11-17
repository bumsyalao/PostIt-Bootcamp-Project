import React from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/messages';
import {
  getGroups, listAllUsers, joinGroup
} from '../../actions/groups';
import GroupCard from './GroupCard';


/**
 * @class ListGroup
 * @extends {React.Component}
 */
class ListGroup extends React.Component {

  /**
   * Creates an instance of ListGroup.
   * Binds class methods.
   * @param {object} props
   *
   * @memberOf ListGroup
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.joinAGroup = this.joinAGroup.bind(this);
    this.listUsers = this.listUsers.bind(this);
  }

  /**
   * Makes an action call to getGroups
   * @memberOf ListGroup
   */
  componentDidMount() {
    this.props.getGroups();
  }

  /**
   *
   * Makes an action call to push to url
   * @param {int} id
   *
   * @memberOf ListGroup
   */
  onClick(id) {
    this.props.history.push(`/homepage/view-group/${id}`);
  }

  /**
   *
   * Makes an action call to joinGroup
   * @param {object} event The event of the HTML component
   *
   * @memberOf ListGroup
   */
  joinAGroup(event) {
    event.preventDefault();
    const id = event.target.id;
    this.props
      .joinGroup(id)
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

  /**
   *
   * Makes an action call to listAllUsers
   * @param {int} groupId
   * @returns users
   *
   * @memberOf ListGroup
   */
  listUsers(groupId) {
    const { users } = this.props;
    if (users && users.length > 0) return;
    this.props
      .listAllUsers(groupId)
      .then(() => {})
      .catch((error) => {
        Materialize.toast(`An error occured: ${error.message}`, 5000, 'red');
      });
  }

  /**
   *
   * Renders ListGroup component
   * @returns ListGroup HMTL component
   *
   * @memberOf ListGroup
   */
  render() {
    return (
      <div>
        <div className="row form-margin">
          <div className="col s12 m12 l12 scroll-group">
            {this.props.groupList.map(group => (
              <GroupCard
                key={group.id}
                id={group.id}
                onClick={() => this.onClick(group.id)}
                joinAGroup={this.joinAGroup}
                {...group}
                users={group.users}
                listUsers={this.listUsers}

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
  joinGroup,
  listAllUsers,
};

export default connect(mapStateToProps, actions)(ListGroup);

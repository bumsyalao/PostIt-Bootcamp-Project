import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMessages } from '../../actions/messages';
import {
  getGroups, listAllUsers
} from '../../actions/groups';
import { allUserGroups } from '../../actions/users';
import ConnectedGroupCard from './GroupCard';


/**
 * @class ListGroup
 * @extends {React.Component}
 */
export class ListGroup extends React.Component {

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
    // this.joinAGroup = this.joinAGroup.bind(this);
    this.listUsers = this.listUsers.bind(this);
  }

  /**
   * Makes action call to get UserId
   * @returns userId
   * @memberOf UserProfile
   */
  componentWillMount() {
    const userid = this.props.access.user.userId;
    this.props.getGroups(userid).catch();
    this.props.allUserGroups(userid).catch();
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
    if (this.props.groupList.length === 0) {
      return (
        <div className="no-group">
        <h4> You have no group </h4>
        <Link to="/homepage/create-group"> Click Here to create your first group
        </Link>
        </div>
      );
    }
    return (
      <div>
        <div className="row form-margin">
          <div className="col s12 m12 l12 scroll-group">
            {this.props.groupList.map(group => (
              <ConnectedGroupCard
                key={group.groupId}
                id={group.groupId}
                onClick={() => this.onClick(group.groupId)}
                {...group}
                users={group.users}
                listUsers={this.listUsers}/>
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
  access: state.access,
  user: state.users.usergroups,
  group: state.group.group,
  groupList: state.group.groupList,
  messages: state.group.groupMessages,
  users: state.group.users
});

const actions = {
  getGroups,
  getMessages,
  listAllUsers,
  allUserGroups
};

export default connect(mapStateToProps, actions)(ListGroup);

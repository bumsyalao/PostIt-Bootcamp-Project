import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listAllUsers } from '../../actions/groups';


/**
 *
 *
 * @class GroupUsers
 * @extends {Component}
 */
export class GroupUsers extends Component {
  /**
   *
   * Makes action call to list all users in group
   * @memberOf GroupChat
   */
  componentWillMount() {
    const id = this.props.match.params.groupid;
    this.props.listAllUsers(id);
  }

  /**
   *
   * Renders GroupUsers component
   * @returns GroupUsers
   *
   * @memberOf GroupUsers
   */
  render() {
    const groupId = this.props.match.params.groupid;
    return (
    <div className="row">
            <Link
          to={`/homepage/view-group/${groupId}`}
          className="waves-effect waves-light red lighten-2 btn">
          {' '}
          Go Back to Group
        </Link>
        <div className="container form-margin">
          <div className="col s12 m7">
            <ul className="collection">
            {this.props.groupList[0] && this.props.groupList[0].users.map(user => (
               <li key ={user.userId} className="collection-item">
               {user.username}
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  groupList: state.group.groupList
});

export default connect(mapStateToProps, { listAllUsers })(GroupUsers);

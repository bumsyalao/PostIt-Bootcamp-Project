import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import MessageCard from './MessageCard';
import { newMessage, getMessages } from '../../actions/messages';
import { getUserGroups, allUserGroups } from '../../actions/users';
import { getGroup, listAllUsers } from '../../actions/groups';

/**
 *
 * @class GroupChat
 * @extends {React.Component}
 */
export class GroupChat extends React.Component {
  /**
   * Creates an instance of GroupChat.
   * Binds class methods
   * @param {any} props
   *
   * @memberOf GroupChat
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messagePriority: 'normal'
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   *
   * Makes action call to getMessages and getGroup
   *
   * @memberOf GroupChat
   */
  componentDidMount() {
    $('select').material_select();
    const { groupId } = this.props.match.params;
    this.props.getMessages(groupId);
    this.props.getGroup(groupId);
  }

  /**
   *
   * Makes action call to get all group users
   * Makes action call to list all users
   * @memberOf GroupChat
   */
  componentWillMount() {
    const id = this.props.group.id;
    const userid = this.props.access.user.userId;
    this.props.allUserGroups(userid);
    this.props.listAllUsers(id);
  }

  /**
   *
   * Sets the event value to the state
   * @param {object} event The event of the HTML component
   *
   * @memberOf GroupChat
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *
   * Makes an action call to get newMessage
   *
   * @memberOf GroupChat
   */

  onSubmit() {
    const { message, messagePriority } = this.state;
    const { groupId } = this.props.match.params;
    this.props
      .newMessage(groupId, this.props.username, { message, messagePriority })
      .then(() => {
        this.setState({
          message: '',
          messagePriority: ''
        });
      });
  }

  /**
   * Renders Groupchat
   * @returns Groupchat
   * @memberof GroupChat
   */
  render() {
    const id = this.props.group.id;
    return (
      <div>
        <div className="row">
          <div className="col s12 m12 l12 message-form">
            <h5> {(this.props.group.groupName || '').toUpperCase()} </h5>
            <Link
              to={`/homepage/group/${id}/add-user`}
              className="waves-effect waves-light red lighten-2 btn"
            >
              <i className="material-icons left">add</i>
              Add User
            </Link>
            <Link
              class="waves-effect waves-light red lighten-2 btn"
              to={`/homepage/group/${id}/group-users`}
            >
              View Users
            </Link>

            <div className="col s12">
              <ul className="msg-collection">
                {this.props.messages.map(message => (
                  <MessageCard key={message.id} {...message} />
                ))}
              </ul>
              <div className="col s12">
                <div className="col s9">
                  <label htmlFor="textarea">Enter Message Here</label> <br />
                  <textarea
                    value={this.state.message}
                    name="message"
                    id="message"
                    onChange={this.onChange}
                  />
                </div>
                <div className="col s3">
                  <label>Priority</label> <br />
                  <select
                    name="messagePriority"
                    id="messagePriority"
                    className="browser-default input-field select"
                    onChange={this.onChange}
                    value={this.state.messagePriority}
                  >
                    <option value="normal" defaultValue>
                      Normal
                    </option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              <button
                className="btn"
                id="submit-message"
                onClick={this.onSubmit}
              >
                {' '}
                Send{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { groupId } = ownProps.match.params;
  return {
    username: state.access.user.username,
    messages: state.messages[groupId] || [],
    group: state.group[groupId] || {},
    userGroups: state.users.usergroups || [],
    access: state.access,
    groupList: state.group.groupList
  };
};

export default connect(mapStateToProps, {
  newMessage,
  getMessages,
  getGroup,
  getUserGroups,
  allUserGroups,
  listAllUsers
})(withRouter(GroupChat));

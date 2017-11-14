import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MessageCard from './MessageCard';
import { newMessage, getMessages } from '../../actions/messages';
import { getUserGroups, allUserGroups } from '../../actions/users';
import { getGroup } from '../../actions/groups';

/**
 *
 * @class GroupChat
 * @extends {React.Component}
 */
class GroupChat extends React.Component {

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
    const userid = this.props.access.user.userId;
    this.props.allUserGroups(userid);
    this.props.getMessages(groupId);
    this.props.getGroup(groupId);
  }

  componentWillMount() {
    const userid = this.props.access.user.userId;
    this.props.allUserGroups(userid);
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
    // check user's groups if they belong to group
    // if groupname is not in array
    // display toast message.
    const userGroups = this.props.userGroups.map(group => group.groupName);
    if (userGroups.indexOf(this.props.group.groupName) === -1) {
      Materialize.toast('Join Group to view Message', 3000, 'red');
      this.props.history.push('/homepage/groups');
      return null;
    }
    return (
      <div>
        <div className="row">
          <div className="col s12 m12 l12 form-margin message-form">
            <h5> {(this.props.group.groupName || '').toUpperCase()} </h5>
            <div className="message-box">
              <ul className="collection">
                {this.props.messages.map(message => (
                  <MessageCard key={message.id} {...message} />
                ))}
              </ul>
            </div>
            <div className="message-holder">
              <div className="message-card2 ">
                <label htmlFor="textarea">Enter Message Here</label>
                <textarea
                  value={this.state.message}
                  name="message"
                  id="message"
                  onChange={this.onChange}
                />
                <label>Priority</label>
                <select
                  name="messagePriority"
                  id="messagePriority"
                  className="browser-default input-field select"
                  onChange={this.onChange}
                  value={this.state.messagePriority}
                >
                  <option value="normal" defaultValue>Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
                <button
                id="submit-message"
                onClick={this.onSubmit}> Send </button>
              </div>
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
  };
};

export default connect(mapStateToProps, {
  newMessage, getMessages, getGroup, getUserGroups, allUserGroups })(withRouter(
  GroupChat
));

import React from 'react';
import { connect } from 'react-redux';
import MessageCard from './MessageCard';
import { newMessage, getMessages } from '../../actions/messages';
import { getGroup } from '../../actions/groups';

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
    group: state.group[groupId] || {}
  };
};

export default connect(mapStateToProps, { newMessage, getMessages, getGroup })(
  GroupChat
);

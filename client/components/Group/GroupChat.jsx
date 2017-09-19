import React from "react";
import { connect } from 'react-redux';
import MessageCard from './MessageCard';
import { newMessage, getMessages } from '../../actions/messages';
import { getGroup } from '../../actions/groups';

class GroupChat extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        message: '',
        messagePriority: ''
      };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
    const { groupId } = this.props.match.params;
    this.props.getMessages(groupId);
    this.props.getGroup(groupId);
  }

  onChange(event) {
    this.setState ({
      [event.target.name]: event.target.value });
  }

  optionChange(event) {
    this.setState ({ messagePriority: event.target.value });
  }

  onSubmit() {
    const { message, messagePriority } = this.state;
    const { groupId } = this.props.match.params;
    this.props.newMessage(groupId, this.props.username, { message, messagePriority })
      .then(() => {
        console.log(this.message);
      });
  }
  /**
   * @returns 
   * @memberof GroupChat
   */
  render() {
    return (
    <div>
      <div className="row">
        <div className="col s12 m12 l12 form-margin message-form">
        <h5> {(this.props.group.groupname || '').toUpperCase()} </h5>        
        <div className="message-box">
          {this.props.messages.map(message =>
             <MessageCard key={message.id} {...message} />)
          }
          </div>
          <div className="message-holder">
            <div className="message-card2 ">
              <label htmlFor="textarea">Enter Message Here</label>
              <textarea value={this.message} name="message" id="textarea" onChange={this.onChange} />
              <label>Priority</label>
              <select
                name="messagePriority"
                className="browser-default input-field select" onChange={this.onChange}>
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="critical">Critical</option>
              </select>
              <button onClick={this.onSubmit}> Send </button>
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

export default connect(mapStateToProps, { newMessage, getMessages, getGroup })(GroupChat);

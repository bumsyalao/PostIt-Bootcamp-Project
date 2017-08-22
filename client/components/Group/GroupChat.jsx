import React from "react";
import { connect } from 'react-redux';
import { newMessage } from '../../actions/messages';

class GroupChat extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        message: '',
        messagePriority: ''
      }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    $('select').material_select();
  }

  onChange(event) {
    this.setState ({
      [event.target.name]: event.target.value});

  }
  optionChange(event) {
    this.setState ({ messagePriority: event.target.value});

  }
  onSubmit() {
    const { message, messagePriority } = this.state;
    console.log(this.state, '----->>')
    this.props.newMessage({ message, messagePriority })
      .then(() => {
        console.log(this.message);
      })
  }

  render() {
    console.log(this.props.messages, this.props)
    return (
      <div className="row">
        <div className="col s12 container form-margin">
          <div className="message-card">
            <div className="message-head">
              <div className="sender">Chris Adams</div>
              <div className="priority">
                Priority: &nbsp;
                <span>Urgent</span>
              </div>
              <div className="time">Tue 12 Jul at 17:55pm</div>
            </div>
            <div className="message-body">
              For the people saying it doesn't work on a Mac, this looks like a
              conflict between the shortcut and the OS X text input system for
              accented characters which depends on your configured locale and
              keyboard settings:
              github.com/Microsoft/vscode/issues/8914#issuecomment-2459478‌​44 –
              Chris Adams Sep 9 '16 at 15:31
            </div>
          </div>


          <div className="message-card2 ">
            <label for="textarea">Enter Message Here</label>
            <textarea value={this.message} name="message" id="textarea" onChange={this.onChange} />

            
            <label>Priority</label>
            <select name="messagePriority" onChange={this.onChange} className=" col s12 m6">
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>
            <button onClick={this.onSubmit}> Send </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { messages: state.messages }
}

export default connect(mapStateToProps, {newMessage})(GroupChat);


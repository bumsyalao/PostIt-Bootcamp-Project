import React from "react";

class GroupChat extends React.Component {
  componentDidMount() {
    $('select').material_select();
 
  }
  render() {
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
            <textarea id="textarea"> </textarea>

            
            <label>Priority</label>
            <select class="browser-default col s12 m6">
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="1">Normal</option>
              <option value="2">Urgent</option>
              <option value="3">Critical</option>
            </select>
            <button> Send </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupChat;

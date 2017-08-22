import React, { Component } from 'react';

const MessageCard = (props) => {
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
            <div className="message-body"> {props.message}
              {/* For the people saying it doesn't work on a Mac, this looks like a
              conflict between the shortcut and the OS X text input system for
              accented characters which depends on your configured locale and
              keyboard settings:
              github.com/Microsoft/vscode/issues/8914#issuecomment-2459478‌​44 –
              Chris Adams Sep 9 '16 at 15:31 */}
            </div>
          </div>
         
        </div>
      </div>
    );
  }

export default MessageCard;

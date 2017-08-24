import React, { Component } from 'react';

const MessageCard = (props) => {
    return (
      <div className="row">
        <div className="col s12 container form-margin">
          <div className="message-card">
            <div className="message-head">
              <div className="sender">{props.username || props.User.username}</div>
              <div className="priority">
                Priority: &nbsp;
                <span>{props.messagePriority}</span>
              </div>
              <div className="time">Tue 12 Jul at 17:55pm</div>
            </div>
            <div className="message-body"> {props.message}
            </div>
          </div>
         
        </div>
      </div>
    );
  }

export default MessageCard;

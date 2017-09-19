import React, { Component } from 'react';

const MessageCard = (props) => {
  const date = new Date(props.createdAt);
    return (
      <div className="row">
        <div className="col s12 container">
          <div className="message-card">
            <div className="message-head">
              <div className="sender">{props.username || props.User.username}</div>
              <div className="priority">
                Priority: &nbsp;
                <span>{props.messagePriority}</span>
              </div>
              <div className="time">{`${date.toDateString()} at ${date.getHours()}:${date.getMinutes()}`}</div>
            </div>
            <div className="message-body"> {props.message}
            </div>
          </div>
         
        </div>
      </div>
    );
  }
export default MessageCard;

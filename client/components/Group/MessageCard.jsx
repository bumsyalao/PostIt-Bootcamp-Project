import React from 'react';

/**
 *
 *
 * @param {any} props 
 * @returns 
 */
const MessageCard = (props) => {
  const date = new Date(props.createdAt);
  return (
    <li className="collection-item">
      <div className="row">
        <div className="col s12 container">
          <div className="message-card">
            <div className="message-head">
              <div className="sender">
                <h6>{(props.username || props.User.username).toUpperCase()}</h6>
              </div>
              <div className="priority">
                Priority: &nbsp;
                <span>{props.messagePriority}</span>
              </div>
              <div className="time">
              {
                `${date.toDateString()} at ${
                  date.getHours()}:${date.getMinutes()}`
              }
              </div>
            </div>
            <div className="message-body"> {props.message}</div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default MessageCard;

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
    <div className="row">
      <div className="col s12">
        <div className="card white">
          <div className="card-content black-text">
            <span className="card-title inline-block">
              @{(props.username || props.User.username).toUpperCase()}
            </span>
            <span className="inline-margin inline-block priority-badge black-text">
              {props.messagePriority}
            </span>
            <span className="inline-margin inline-block right">
              {`${date.toDateString()} at ${date.getHours()}:${date.getMinutes()}`}
            </span>
          </div>
          <div className="card-action">
            <p className="message-text"> {props.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageCard;

import React from 'react';

const GroupCard = ({ groupname, id, onClick, joinGroup }) => {
  console.log(id);
  return (
      <div className="card #ffcdd2 red lighten-5">
        <div className="card-content black-text">
          <a name={id} onClick={onClick} href="#!" className="card-title">{groupname}</a>
        </div>
        <div className="card-action">
          <button
            className="linkcolor"
            data-id={id}
            onClick={joinGroup}
          >
            This is a link
          </button>
        </div>
      </div>
  );
}

export default GroupCard;
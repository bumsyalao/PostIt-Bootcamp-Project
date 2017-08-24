import React, { Component } from 'react';

const GroupCard = ({ groupname, id, onClick, joinGroup }) => (
  <div className="card #ffcdd2 red lighten-5">
    <div className="card-content black-text">
      <a name={id} onClick={onClick} href="#!" className="card-title">{groupname}</a>
    </div>
    <div className="card-action">
      <i className="material-icons prefix">add</i>
        <button
        className="linkcolor"
        name={id}
        onClick={joinGroup}
        > JOIN GROUP
        </button>
    </div>
  </div>
);

export default GroupCard;
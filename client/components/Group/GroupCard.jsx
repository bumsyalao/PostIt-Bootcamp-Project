import React, { Component } from 'react';

const GroupCard = ({ groupname, id, onClick, joinGroup }) => (
  <div className="card #ffcdd2 red lighten-5">
    <div className="card-content black-text">
      <a name={id} onClick={onClick} href="#!" className="card-title">{groupname}</a>
    </div>
    <div className="card-action">

        <button

        className="linkcolor"
        name={id}
        onClick={joinGroup}
        > <i className="tiny material-icons prefix">add_box</i> JOIN GROUP
        </button>
        <button
        className="linkcolor float-right"
        ><i className="tiny material-icons prefix">account_circle</i> VIEW USERS
        </button>
    </div>
  </div>
);

export default GroupCard;
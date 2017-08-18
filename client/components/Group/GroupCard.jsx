import React, { Component } from 'react';

class GroupCard extends Component {
  constructor() {
    super();
    this.joinGroup = this.joinGroup.bind(this);
  }
    joinGroup(){
      const { id } = this.props;
      return this.props.joinGroup(id);

    }
  render() { 
    const { groupname, id, onClick } = this.props;
    return (
        <div className="card #ffcdd2 red lighten-5">
          <div className="card-content black-text">
            <a name={id} onClick={onClick} href="#!" className="card-title">{groupname}</a>
          </div>
          <div className="card-action">
            <button
              className="linkcolor"
              data-id={id}
              onClick={this.joinGroup}
            >
              This is a link
            </button>
          </div>
        </div>
    );
  }
}

export default GroupCard;
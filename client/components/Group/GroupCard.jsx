import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GroupCard extends Component {
  
  componentDidMount() {
    $('.collapsible').collapsible();
  }
  
  render() {
    const { groupname, id, onClick, joinGroup } = this.props;
    
    return (
      <div className="row">
        <div className="col s12 container form-margin">
        <div className="message-card">
          <div className="card-content black-text">
            <Link to={`/homepage/view-group/${id}`} 
                  className="card-title">
                  {groupname}
            </Link>
          </div>
          <div className="card-action">
          <ul className="collapsible " data-collapsible="accordion">
            <li>
              <div className="collapsible-header red lighten-5" id="document-header">
                <i className="material-icons">more_vert</i>Options</div>
              <div className="collapsible-body options #ffebee red lighten-5" id="groups">
                <ul>
                  <button
                  className="linkcolor"
                  name={id}
                  onClick={joinGroup}
                  > <i className="tiny material-icons prefix">add_box</i> JOIN GROUP
                  </button>
                  <button
                  className="linkcolor "
                  ><i className="tiny material-icons prefix">account_circle</i> VIEW USERS
                  </button>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
    )
  }
}
export default GroupCard;
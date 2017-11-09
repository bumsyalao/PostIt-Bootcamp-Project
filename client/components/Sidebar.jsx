import React from 'react';
import { Link } from 'react-router-dom';
import feminist from '../images/feminist.png';


const SideBar = () => (
  <div>
    <ul id="slide-out" className="side-nav fixed #e57373 red lighten-2">
      <li>
        <div className="user-view">
          <div className="side-logo center">
            <img src={feminist} width="50%" height="50%" />
          </div>
        </div>
      </li>
      <ul className="collapsible " data-collapsible="accordion">
        <li>
          <div className="collapsible-header" id="document-header">
            <i className="material-icons">group</i>Groups
          </div>
          <div className="collapsible-body #ffebee red lighten-5" id="groups">
            <ul>
              <li>
                <Link to="/homepage/create-group" id="create-group">
                  <i className="material-icons">group_add</i>
                  Create Group
                </Link>
              </li>
              <li>
                <Link to="/homepage/groups">
                  <i className="material-icons">groups</i>
                  All Groups
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <ul className="collapsible " data-collapsible="accordion">
        <li>
          <div className="collapsible-header" id="document-header">
            <i className="material-icons">person</i>Users
          </div>
          <div className="collapsible-body #ffebee red lighten-5" id="groups">
            <ul>
              <li>
                <Link to="/homepage/user-profile" id="create-group">
                  <i className="material-icons">face</i>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/homepage/search-users">
                  <i className="material-icons">search</i>
                  Search User
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </ul>
  </div>
);

export default SideBar;

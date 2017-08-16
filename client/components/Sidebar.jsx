import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CreateGroup from './Group/CreateGroup';
import './images/LogoSample_ByTailorBrands.jpeg';

const SideBar=() => (
  <ul id="slide-out" className="side-nav fixed ">
    <li><div className="user-view">
      <div className="side-logo center">
        
          <img
            src="./images/welcome-image.jpg" height="100px" width="100px"/>
      </div>
    </div></li>
    <ul className="collapsible" data-collapsible="accordion">
      <li>
        <div className="collapsible-header" id="document-header">
          <i className="material-icons">group</i>Groups</div>
        <div className="collapsible-body" id="groups">
          <ul>
            <li><Link to='/creategroup' id="create-group">
              <i className="material-icons">group_add</i>
              Create Group</Link>
            </li>
            <li><Link to='/all-groups' >
              <i className="material-icons">groups</i>
              All Groups</Link></li>
          </ul>
        </div>
      </li>
      <li>
        <div className="collapsible-header" id="user-header">
          <i className="material-icons">face</i>Users</div>
        <div className="collapsible-body" id="user">
          <ul>
            <li><Link to='/profile' id="profile">
              <i className="material-icons">perm_identity</i>
              Profile</Link></li>
              <li>
              <Link to='all-users' id="userList">
                <i className="material-icons">people_outline</i>
                All Users</Link></li>
          </ul>
        </div>
      </li>
    </ul>
    <div className="col s9"> <img src="https://goo.gl/photos/UpxDhKEHMoz8Fadu8"/>" </div>
  </ul>

)

export default SideBar;

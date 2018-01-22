import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import welcomeimage from '../images/welcome-image.jpg';


const Dashboard = () => (
  <div>
    <NavigationBar />
    <div className="section no-pad-bot" id="index-banner">
      <div className="container">
        <br />
        <div className="center">
         <img src={welcomeimage} />
        </div>
        <div className="row center">
          <h3 className="header col s12 light">Share Anything, With Anyone!</h3>
        </div>
        <div className="row center">
            <Link to="/signup" id="download-button"
            className=
            "btn-large waves-effect waves-light red lighten-2">
            Get Started</Link>{' '}
        </div>
        <br />
      </div>
    </div>
  </div>
);

export default Dashboard;

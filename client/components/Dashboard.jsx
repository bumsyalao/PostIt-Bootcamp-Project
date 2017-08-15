import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
        <div className="section no-pad-bot" id="index-banner">
          <div className="container">
            <br></br>
            <div className="center">
            <img src ="https://www.embracingspirituality.com/wp-content/uploads/wpforo/default_attachments/1489579326-welcome.jpg"/>
            </div>
            <div className="row center">
              <h3 className="header col s12 light">Share Anything, With Anyone!</h3>
            </div>
            <div className="row center">
              <a href="register1.html" id="download-button" className="btn-large waves-effect waves-light red lighten-2">
                <Link to="/signup">Get Started</Link> </a>
            </div>
            <br></br>

          </div>
        </div>
    );

export default Dashboard;


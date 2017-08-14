import React from 'react';
import { Link } from 'react-router';

export default () => {
    return(
      <nav>
          <div className="nav-wrapper container">
              <link to="/">
              <a id="logo-container" className="brand-logo">POST-IT</a>
              </link>
            <ul className="right">
              <li><a href="login.html">Login</a></li>
            </ul>
            <ul className="right">
              <li><link to="/signup">Register</link></li>
            </ul>
            <ul id="nav-mobile" className="side-nav">
              <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
          </div>
        </nav>

    );
}
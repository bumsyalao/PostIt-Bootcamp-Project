import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => (
      <nav>
          <div className="nav-wrapper container">
              <Link to="/">
              <a id="logo-container" className="brand-logo">POST-IT</a>
              </Link>
            <ul className="right">
              <li><a href="login.html">Login</a></li>
            </ul>
            <ul className="right">
              <li><Link to="/signup">Register</Link></li>
            </ul>
            <ul id="nav-mobile" className="side-nav">
              <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
          </div>
        </nav>
    );

export default NavigationBar;
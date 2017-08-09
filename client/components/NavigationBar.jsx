import React from 'react';
import { Link } from 'react-router';

export default () => {
    return(
      <nav>
          <div class="nav-wrapper container">
              <link to="/">
              <a id="logo-container" class="brand-logo">POST-IT</a>
              </link>
            <ul class="right">
              <li><a href="login.html">Login</a></li>
            </ul>
            <ul class="right">
              <li><link to="/signup">Register</link></li>
            </ul>
            <ul id="nav-mobile" class="side-nav">
              <li><a href="#">Navbar Link</a></li>
            </ul>
            <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
          </div>
        </nav>

    );
}
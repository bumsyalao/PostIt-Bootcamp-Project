import React from 'react';
import NavigationBar from './NavigationBar';

const PageNotFound = () => (
  <div>
  <NavigationBar/>
    <h4 className="error-page"> Error 404: Page Not Found </h4>
  </div>

);

export default PageNotFound;

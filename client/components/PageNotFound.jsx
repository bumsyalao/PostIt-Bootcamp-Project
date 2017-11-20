import React from 'react';
import ConnectedNavigationBar from './NavigationBar';

const PageNotFound = () => (
  <div>
  <ConnectedNavigationBar/>
    <h4 className="error-page"> Error 404: Page Not Found </h4>
  </div>

);

export default PageNotFound;

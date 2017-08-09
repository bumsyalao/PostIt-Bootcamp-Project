 /*./client/components/App.js */

import React from 'react';
import NavigationBar from './NavigationBar';

class App extends React.Component{
  render() {
    return (
      <div classname ="container">
        <NavigationBar />
        {this.props.children}
 </div> 
    );
  }
}
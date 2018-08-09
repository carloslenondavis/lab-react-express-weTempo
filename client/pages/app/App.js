import React, { Component } from 'react';
import Header from './../../common/components/header/Header';
import Weather from './../../common/components/weather/weather';
import './app.css';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Weather />
      </div>
    );
  }
}

export default App;

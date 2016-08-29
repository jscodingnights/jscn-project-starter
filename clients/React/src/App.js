import React, { Component } from 'react';
import { Provider } from 'react-redux';
import SampleClassComponent from './components/SampleClassComponent';
import logo from './logo.svg';
import './App.css';

// TODO: In order to use React-redux, use Provider, and createStore

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">
          <SampleClassComponent />
        </p>
      </div>
    );
  }
}

export default App;

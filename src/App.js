import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To do</h1>
        </header>
        <p className="App-intro">
          Here will be the tasks...
        </p>
      </div>
        </MuiThemeProvider>
    );
  }
}

export default App;

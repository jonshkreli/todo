import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.css';
import TasksContainer from "./TasksContainer";

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
          <TasksContainer/>
        </p>
      </div>
        </MuiThemeProvider>
    );
  }
}

export default App;

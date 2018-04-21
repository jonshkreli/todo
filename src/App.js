import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.css';
import TasksContainer from "./TasksContainer";
import {TasksExampleData} from "./sources/TasksExampleData";

class App extends Component {


  render() {
    return (
        <MuiThemeProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To do</h1>
        </header>
        <div className="App-intro">
          <TasksContainer/>
        </div>
      </div>
        </MuiThemeProvider>
    );
  }
}

export var globalDebugEnabled = false; //Enable debugging globally. Can overwrite local debug flags!

/* Conditioned Console */
export function conCon(localDebugger, message) {
    if(globalDebugEnabled || localDebugger) console.log(message);
}

export default App;

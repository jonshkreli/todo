import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import TasksContainer from "./TasksContainer";

class App extends Component {


    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <header className="App-header">
                        {/*<img src={logo} className="App-logo" alt="logo" />*/}
                        <i className="material-icons" style={{fontSize: '48px'}}>done</i>
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
    if (globalDebugEnabled || localDebugger) console.log(message);
}

export default App;

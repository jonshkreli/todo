import React, {Component} from 'react';
import Task from "./Task";

class TasksContainer extends Component {
    render() {
        return (
            <div>
                <Task/>
                <Task/>
            </div>
        );
    }
}

export default TasksContainer;

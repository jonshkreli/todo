import React, {Component} from 'react';
import Task from "./InlineTask";
import {TasksExampleData} from "./sources/TasksExampleData";
import FullViewTask from "./FullViewTask";

/**
 * @author Jon Shkreli
 * This view will hold the list of all items and a full view for the task to fully watch and edit it
 * This component is unique/singleton
 * */
class TasksContainer extends Component {


    state = {
        tasksList: [], //Supposed to receive all tasks data via ajax
        activeTask: emptyTask(),
    };

    debugEnabled = false; //If true it will print debug messages

    constructor() {
        super();
        this.setActive = this.setActive.bind(this);
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({tasksList: this.getTasksListWithAjax()})
        }, simulateDelay ? simulateDelay : 0)
    }

    getTasksListWithAjax() {
        //This will return an array of tasks. For now we are using TasksExampleData
        return TasksExampleData;
    }

    /**
     * Callback function received from TasksContainer
     * This will send updated data to backend via ajax
     * */
    updateWithAjax(taskData, modifiedTask) {
        console.log(modifiedTask);
        setTimeout(() => {
            let modifiedTaskList = this.state.tasksList;
            let findModifiedTask = modifiedTaskList.find(task => task === taskData);
            findModifiedTask = modifiedTask;

            this.setState({tasksList: modifiedTaskList})
        }, simulateDelay ? simulateDelay : 0)
    }

    setActive(taskData) {
        console.log(taskData);
        this.setState({activeTask: taskData})
    }

    /**
     * Render function will have 2 separate containers.
     * One will have a list of <InlineTask/> from props.data with map function
     * It will pass as props all properties of "data" objects
     * properties passed:
     * - (String) title
     * - (Boolean) done
     * - (function) saveTitleChanges
     * - (function) saveMarking
     *
     * The second will have a FullTaskView
     * It will pass as props all properties of "data" objects
     * properties passed:
     * - (Number) id
     * - (String) title
     * - (String) description
     * - (Boolean) done
     * - (Date) created
     * - (Date) lastUpdated
     * - (Date) deadline
     * - (function) saveChanges
     * */
    render() {
        return (
            <div>
                <div id='tasks-list'>
                    {this.state.tasksList.map(taskData =>
                        <Task
                            title={taskData.title}
                            done={taskData.done}
                            //created={taskData.created}
                            //lastUpdated={taskData.lastUpdated}
                            //deadline={taskData.deadline}
                            saveTitleChanges={(title) => {
                                let modifiedTask = taskData;
                                modifiedTask.title = title;
                                this.updateWithAjax(taskData, modifiedTask)
                            }}
                            saveMarking={(done) => {
                                let modifiedTask = taskData;
                                modifiedTask.done = done;
                                this.updateWithAjax(taskData, modifiedTask)
                            }}
                            setThisActive={() => this.setActive(taskData)}
                        />
                    )}
                </div>
                <FullViewTask
                    taskToDisplay={this.state.activeTask}
                    saveChanges={(modifiedTask) => {
                        this.updateWithAjax(this.state.activeTask, modifiedTask)
                    }}
                />
            </div>
        );
    }

    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
}

//It is used to simulate ajax delays
const simulateDelay = false;


export function emptyTask() {
    return {
        id: null,
        title: null,
        description: null,
        done: false,
        created: null,
        lastUpdated: null,
        deadline: null,
    }
}


export default TasksContainer;

import React, {Component} from 'react';
import Task from "./InlineTask";
import {TasksExampleData} from "./sources/TasksExampleData";
import FullViewTask from "./FullViewTask";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Snackbar from 'material-ui/Snackbar';
import {conCon} from "./App";

/**
 * @author Jon Shkreli
 * This view will hold the list of all items and a full view for the task to fully watch and edit it
 * This component is unique/singleton
 * */
class TasksContainer extends Component {


    state = {
        tasksList: [], //Supposed to receive all tasks data via ajax
        activeTask: null,
        snackbar: {open: false, message: ''}
    };

    debugEnabled = false; //If true it will print debug messages

    constructor() {
        super();
        this.setActive = this.setActive.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({tasksList: TasksContainer.getTasksListWithAjax()})
        }, simulateDelay ? simulateDelay : 0)
    }

    shouldComponentUpdate(np, ns) {
        conCon(this.debugEnabled, np, ns);
        return true
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(nextProps) {
    }

    static getTasksListWithAjax() {
        //This will return an array of tasks. For now we are using TasksExampleData
        return TasksExampleData;
    }

    /**
     * Callback function received from TasksContainer
     * This will send updated data to backend via ajax
     * */
    updateWithAjax(originalTask, modifiedTask, quickedit) {
        console.log(modifiedTask);
        setTimeout(() => {
            // let modifiedTaskList = Object.assign({}, this.state.tasksList);
            // let findModifiedTask = modifiedTaskList.find(task => task === originalTask);
            // findModifiedTask = Object.assign({}, modifiedTask);
            // findModifiedTask.lastUpdated = new Date();

            let modifiedTaskList = this.state.tasksList.map(task => {
                if (task === originalTask) {
                    task = modifiedTask;
                    task.lastUpdated = new Date();
                }
                return task;
            });

            let message;
            if (quickedit === 'done') message = (modifiedTask.title + ' marked as ') + (modifiedTask.done ? 'done' : 'undone');
            else if (quickedit === 'title') message = (modifiedTask.title + ' changed to ') + modifiedTask.title;
            else message = (modifiedTask.title ? modifiedTask.title : 'task') + ' updated';

            this.setState({
                tasksList: modifiedTaskList,
                activeTask: modifiedTask,
                snackbar: {open: true, message: message}
            })
        }, simulateDelay ? simulateDelay : 0)

    }

    /**
     * Callback function received from TasksContainer
     * This will send delete data to backend via ajax
     * */
    deleteWithAjax(taskData) {
        conCon(this.debugEnabled, taskData);

        setTimeout(() => {
            this.setState({
                tasksList: this.state.tasksList.filter(task => task !== taskData),
                snackbar: {open: true, message: (taskData.title ? taskData.title : 'task') + ' deleted'},
                activeTask: null
            })
        }, simulateDelay ? simulateDelay : 0)
    }

    addNewTask() {
        //Add a new empty task
        let tempTaskList = this.state.tasksList;
        let emptyTask = TasksContainer.emptyTask();
        tempTaskList.push(emptyTask);
        this.setState({
            tasksList: tempTaskList,
            snackbar: {open: true, message: 'New task created'},
            activeTask: emptyTask
        })
    }

    /**
     * Determine which task is active, in order to be shown to FullViewTask
     * */
    setActive(taskData) {
        /*For some performance optimising, update the state only if there is another task selected*/
        if(this.state.activeTask !== taskData)
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
     * Also this contains the "+" button, which immediately creates a new empty task
     * (see TasksContainer.emptyTask() function)
     *
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
                    {this.state.tasksList.length === 0 ? <h3>Not any task yet</h3> : null}
                    {this.state.tasksList.map(taskData =>
                        <Task key={taskData.id}
                              title={taskData.title}
                              done={taskData.done}
                            //created={taskData.created}
                            //lastUpdated={taskData.lastUpdated}
                            //deadline={taskData.deadline}
                              saveTitleChanges={(title) => {
                                  let modifiedTask = Object.assign({}, taskData);
                                  modifiedTask.title = title;
                                  this.updateWithAjax(taskData, modifiedTask, 'title')
                              }}
                              saveMarking={(done) => {
                                  let modifiedTask = Object.assign({}, taskData);
                                  modifiedTask.done = done;
                                  this.updateWithAjax(taskData, modifiedTask, 'done')
                              }}
                              setThisActive={() => {
                                  this.setActive(taskData)
                              }}
                        />
                    )}
                    <FloatingActionButton
                        style={{margin: '10px'}}
                        onClick={this.addNewTask}
                    >
                        <i className="material-icons">add</i>
                    </FloatingActionButton>

                </div>

                <FullViewTask
                    taskToDisplay={this.state.activeTask}
                    saveChanges={(modifiedTask) => {
                        this.updateWithAjax(this.state.activeTask, modifiedTask)
                    }}
                    deleteThis={() => this.deleteWithAjax(this.state.activeTask)}
                />
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        );
    }

    handleRequestClose = () => {
        this.setState({
            snackbar: {open: false, message: ''}
        });
    };

    static emptyTask() {
        return {
            id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),
            title: '',
            description: '',
            done: false,
            created: new Date(),
            lastUpdated: undefined,
            deadline: undefined,
        }
    }
}

//It is used to simulate ajax delays
const simulateDelay = false;


export default TasksContainer;

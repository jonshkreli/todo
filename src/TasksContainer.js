import React, {Component} from 'react';
import Task from "./InlineTask";
import {TasksExampleData} from "./sources/TasksExampleData";

/**
 * @author Jon Shkreli
 * This view will hold the list of all items and a full view for the task to fully watch and edit it
 * This component is unique/singleton
 * */
class TasksContainer extends Component {


    state = {
        tasksList: [], //Supposed to receive all tasks data via ajax
    };

    constructor(props) {
        super(props);
        this.state.tasksList = this.getTasksListWithAjax();
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
                            description={taskData.description}
                            done={taskData.done}
                            created={taskData.created}
                            lastUpdated={taskData.lastUpdated}
                            deadline={taskData.deadline}
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
                        />
                    )}
                </div>

                <div id='task-full-view'>

                </div>
            </div>
        );
    }
}

const simulateDelay = 3000;

export default TasksContainer;

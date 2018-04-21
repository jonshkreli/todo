import React, {Component} from 'react';
import Task from "./Task";

/**
 * @author Jon Shkreli
 * This view will hold the list of all items.
 * This component is unique/singleton
 *
 * properties received from App.js:
 * - name: data
 *   type: Array
 *   description: see /sources/TasksExampleData.js
 * */
class TasksContainer extends Component {

    /**
     * Render function will generate a <Task/> from props.data with map function
     * It will pass as props all properties of "data" objects
     * properties passed
     * - (String) title
     * - (String) description
     * - (Boolean) done
     * - (Date) created
     * - (Date) lastUpdated
     * - (Date) deadline
     * */
    render() {
        return (
            <div>
                {this.props.data.map(taskData =>
                    <Task
                    title={taskData.title}
                    description={taskData.description}
                    done={taskData.done}
                    created={taskData.created}
                    lastUpdated={taskData.lastUpdated}
                    deadline={taskData.deadline}
                    />
                )}
            </div>
        );
    }
}

export default TasksContainer;

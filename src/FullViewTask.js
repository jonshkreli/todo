import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


/**
 * @author Jon Shkreli
 * After clicking on task (in inline view) this will display the full task where you can customise everything
 * This component will be inside TasksContainer
 *
 * properties expected to receive from TasksContainer:
 * - (Task) taskToDisplay
 * -- (Number) id
 * -- (String) title
 * -- (String) description
 * -- (Boolean) done
 * -- (Date) created
 * -- (Date) lastUpdated
 * -- (Date) deadline
 *
 * - name: saveChanges
 *   type: Function(modifiedTask)
 *   description: Callback function. This will be used too as a callback function to send edited Task
 *   from <FullViewTask/> to <TasksContainer/>
 *
 *
 * state:
 * - (Number) id
 * - (String) title
 * - (String) description
 * - (Boolean) done
 * - (Date) created
 * - (Date) lastUpdated
 * - (Date) deadline
 * Each of them will be initialised from props
 * - (Boolean) editingButtonsActive
 *    Default: false. Will be active once user start editing the TextField
 * */
class FullViewTask extends Component {

    state = {
        task: this.props.taskToDisplay,
        editingButtonsActive: false
    };

    debugEnabled = false; //If true it will print debug messages

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps){
        this.setState({task: nextProps.taskToDisplay});
    }

    /**
     * @param origin 'title','description'
     * @param newValue
     * */
    handleChangeText = (origin, newValue) => {
        let modifiedTask = this.state.task;
        modifiedTask[origin] = newValue;
        this.setState({
            task: modifiedTask,
            editingButtonsActive: true
        });
    };

    /*Same as handleChangeText, just that it is for mark done/undone*/
    handleChangeMark = (event) => {
        let modifiedTask = this.state.task;
        modifiedTask.done = !this.state.task.done;
        this.setState({
            task: modifiedTask,
            editingButtonsActive: true
        });
    };

    /**
     * This function will make a callback to TasksContainer with the updated task
     * This disables save and cancel buttons
     * */
    saveChangesEvent = () => {
        this.setState({
            editingButtonsActive: false
        });
        this.props.saveChanges(this.props.taskToDisplay, this.state.task);
    };

    /**
     * This function will restore the default value of title
     * This disables save and cancel buttons
     * */
    cancelEvent = (event) => {
        this.setState({
            task: this.props.activeTask,
            editingButtonsActive: false
        });
    };

    /**
     * This function will send a callback to TasksContainer.updateWithAjax via property saveMarking
     * */
    saveMarkingEvent = (event) => {
        this.setState({done: !this.state.done});
        this.props.saveMarking(!this.state.done)
    };

    render() {
        return (
            <div id='full-task-view'>
                <div id='header-info'>

                </div>

                <div id='main-data'>
                    <TextField
                        id="title"
                        value={this.state.task.title}
                        onChange={(event, newValue) => this.handleChangeText('title', newValue)}
                        hintText='title'
                    />
                    <TextField
                        id="description"
                        value={this.state.task.description}
                        onChange={(event, newValue) => this.handleChangeText('description', newValue)}
                        hintText='description'
                    />
                    <FlatButton
                        icon={<i
                            className="material-icons">{(this.state.task.done ? 'check_box' : 'check_box_outline_blank')}</i>}
                        onClick={this.handleChangeMark}
                    />
                </div>

                <div id='actions'>
                    <FlatButton
                        label="Save"
                        primary={true}
                        icon={<i className="material-icons">save</i>}
                        disabled={!this.state.editingButtonsActive}
                        onClick={this.saveChangesEvent}
                    />
                    <FlatButton
                        label="Cancel"
                        secondary={true}
                        icon={<i className="material-icons">cancel</i>}
                        disabled={!this.state.editingButtonsActive}
                        onClick={this.cancelEvent}
                    />
                </div>

            </div>
        );
    }
}

export default FullViewTask;

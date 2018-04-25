import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import {conCon} from "./App";


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
 * - name deleteThis
 *   type: Function()
 *   description: Callback function. This will be used too as a callback function to send deleted Task
 *   from <FullViewTask/> to <TasksContainer/>
 *
 * state:
 * - task
 * These will be properties inside task
 * -- (Number) id
 * -- (String) title
 * -- (String) description
 * -- (Boolean) done
 * -- (Date) created
 * -- (Date) lastUpdated
 * -- (Date) deadline
 * Each of them will be initialised from props
 * - (Boolean) editingButtonsActive
 *    Default: false. Will be active once user start editing the TextField
 * - (Boolean) deleteDialogOpen
 *   Default: false. Will be active once user press "delete" button. False after dialog is closed.
 * */
class FullViewTask extends Component {

    state = {
        task: this.props.taskToDisplay,
        editingButtonsActive: false,
        deleteDialogOpen: false
    };

    debugEnabled = false; //If true it will print debug messages

    constructor(props) {
        super(props);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            task: nextProps.taskToDisplay,
            editingButtonsActive: this.props === nextProps
            /*If props change, it means another one is selected. So deactivate the buttons*/

        });
    }

    shouldComponentUpdate(np, ns) {
        conCon(this.debugEnabled, np, ns);
        return true
    }

    componentDidUpdate() {

    }

    /**
     * @param origin 'title','description'
     * @param newValue
     * */
    handleChangeText = (origin, newValue) => {
        let modifiedTask = Object.assign({}, this.state.task);
        modifiedTask[origin] = newValue;
        this.setState({
            task: modifiedTask,
            editingButtonsActive: true
        });
    };

    /*Same as handleChangeText, just that it is for mark done/undone*/
    handleChangeMark = (/*event*/) => {
        let modifiedTask = Object.assign({}, this.state.task);
        modifiedTask.done = !this.state.task.done;
        this.setState({
            task: modifiedTask,
            editingButtonsActive: true
        });
    };

    handleChangeDeadlineDate = (event, date) => {

        if (!this.state.task) return;

        let modifiedTask = Object.assign({}, this.state.task);
        conCon(this.debugEnabled, date);

        if (!modifiedTask.deadline) modifiedTask.deadline = new Date();

        /*date is always date and 00:00:00, so we need to only add date if we have one already */
        modifiedTask.deadline.setFullYear(date.getFullYear());
        modifiedTask.deadline.setMonth(date.getMonth());
        modifiedTask.deadline.setDate(date.getDate());

        this.setState({
            task: modifiedTask,
            editingButtonsActive: true
        });
    };

    handleChangeDeadlineTime = (event, time) => {
        let modifiedTask = Object.assign({}, this.state.task);
        conCon(this.debugEnabled, time);

        modifiedTask.deadline = time;

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
        this.props.saveChanges(this.state.task);
    };

    /**
     * This function will restore the default value of title
     * This disables save and cancel buttons
     * */
    cancelEvent = (/*event*/) => {
        this.setState({
            task: this.props.activeTask,
            editingButtonsActive: false
        });
    };

    /**
     * This function will be called when delete button is pressed. (An task must be active for delete button to be active)
     * This function will open a dialog which you have 2 options: "YES" and "NO". This will be released by setting
     * deleteDialogOpen to "true"
     * */
    deleteEvent(/*event*/) {
        this.setState({
            deleteDialogOpen: true
        });
    }

    deleteDialogActions = [
        <FlatButton
            label="Yes"
            primary={true}
            onClick={() => this.handleDeleteDialogClose(true)} //If true then delete the task and close dialog
        />,
        <FlatButton
            label="No"
            secondary={true}
            onClick={() => this.handleDeleteDialogClose(false)} //If false just close dialog
        />,
    ];

    /**
     * This function will be called if we press "Yes" or "No" buttons in DeleteDialog.
     * 1 - Depending on deleteStatus it will delete or not the item by calling this.props.deleteThis
     * 2 - Will close the dialog
     * */
    handleDeleteDialogClose(deleteStatus) {
        this.setState({
            deleteDialogOpen: false
        });

        if (deleteStatus) this.props.deleteThis();
    }


    render() {

        if (!this.state.task) return <div id='no-active-task'>No task selected</div>;

        return (
            <div id='full-task-view'>
                <div id='header-info'>
                    <Chip containerElement='span' style={{display: 'inline-flex'}}>
                        Created {this.state.task.created.toLocaleString()}
                    </Chip>

                    {this.state.task.lastUpdated ?
                        <Chip containerElement='span' style={{display: 'inline-flex'}}>
                            Last modified {this.state.task.lastUpdated.toLocaleString()}
                        </Chip>
                        : ''}

                </div>

                <div id='main-data'>
                    <div id='headline'>
                        <TextField
                            id="title"
                            value={this.state.task.title}
                            onChange={(event, newValue) => this.handleChangeText('title', newValue)}
                            hintText='title'
                        />
                        <DatePicker
                            hintText="DEADLINE date"
                            value={this.state.task.deadline}
                            onChange={this.handleChangeDeadlineDate}
                        />
                        <TimePicker
                            //format="ampm"
                            hintText={"DEADLINE time"}
                            value={this.state.task.deadline}
                            onChange={this.handleChangeDeadlineTime}
                        />
                        <FlatButton
                            label={'This task is ' + (this.state.task.done ? 'done' : 'undone')}
                            icon={<i
                                className="material-icons">{(this.state.task.done ? 'check_box' : 'check_box_outline_blank')}</i>}
                            onClick={this.handleChangeMark}
                        />
                    </div>

                    <div id='description'>
                        <TextField
                            id="description"
                            value={this.state.task.description}
                            onChange={(event, newValue) => this.handleChangeText('description', newValue)}
                            hintText='description'
                            multiLine={true}
                        />
                    </div>

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
                    <FlatButton
                        label="Delete"
                        icon={<i className="material-icons">delete</i>}
                        onClick={this.deleteEvent}
                        //onClick={this.props.deleteThis}
                    />
                    <Dialog
                        title={"Task " + this.state.task.title}
                        actions={this.deleteDialogActions}
                        modal={true}
                        open={this.state.deleteDialogOpen}
                    >
                        Are you sure you want to delete this task?
                    </Dialog>

                </div>

            </div>
        );
    }
}

export default FullViewTask;

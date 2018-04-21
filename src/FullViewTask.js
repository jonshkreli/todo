import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Chip from 'material-ui/Chip';
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

    debugEnabled = true; //If true it will print debug messages

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
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

    handleChangeDeadlineDate = (event, date) => {

        if (!this.state.task) return;

        let modifiedTask = this.state.task;
        conCon(this.debugEnabled, date);

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
        let modifiedTask = this.state.task;
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

    render() {

        if (!this.state.task) return <div id='no-active-task'>No task selected</div>;

        //TODO: fill header-info
        //TODO: DELETE button
        return (
            <div id='full-task-view'>
                <div id='header-info'>
                    <Chip>Created {this.state.task.created.toLocaleString()}</Chip>

                    {this.state.task.lastUpdated ?
                        <Chip>
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
                        onClick={this.props.deleteThis}
                    />

                </div>

            </div>
        );
    }
}

export default FullViewTask;

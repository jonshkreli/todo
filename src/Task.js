import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/navigation/cancel';



/**
 * @author Jon Shkreli
 * This will have the shape of a single line displaying title and (done/undone) status
 * These components will be inside TasksContainer
 *
 * properties expected to receive from TasksContainer:
 * - (String) title
 * - (String) description
 * - (Boolean) done
 * - (Date) created
 * - (Date) lastUpdated
 * - (Date) deadline
 * - name: saveChanges
 *   type: Function(newTask)
 *   description: Callback function. This will be used too as a callback function to send data from <Task/> to <App/>
 *
 *
 * state:
 * - (String) title
 *    Will be initialised from this.props.title. It will hold the value in textfield
 * - (Boolean) editingButtonsActive
 *    Default: false. Will be active once user start editing the TextField
 * */
class Task extends Component {

    state = {
      title: this.props.title,
        editingButtonsActive: false
    };

    constructor(props) {
        super(props);
    }

    /**
     * @param event We need the value from the event (event.target.value) to get the new text
     * This function updates this components state by changing title, also it makes visible save and cancel buttons,
     * save button will have a callback function to TasksContainer to give the new data back
     * */
    handleChange = (event) => {
        this.setState({
            title: event.target.value,
            editingButtonsActive: true
        });
    };

    /**
     * This function will make a callback to TasksContainer with the updated changes
     * This disables save and cancel buttons
     * */
    saveEvent = (event) => {
        this.setState({
            editingButtonsActive: false
        });
        this.props.saveChanges(this.state.title);
    };

    /**
     * This function will restore the default value of title
     * This disables save and cancel buttons
     * */
    cancelEvent = (event) => {
        //TODO: callback function
        this.setState({
            title: this.props.title,
            editingButtonsActive: false
        });
    };



    render() {
        return (
            <div>
                <TextField
                    id="text-field-controlled"
                    value={this.state.title}
                    onChange={this.handleChange}
                />
                <FlatButton
                    label="Save"
                    primary={true}
                    icon={<i className="material-icons">save</i>}
                    disabled={!this.state.editingButtonsActive}
                    onClick={this.saveEvent}
                />
                <FlatButton
                    label="Cancel"
                    secondary={true}
                    icon={<i className="material-icons">cancel</i>}
                    disabled={!this.state.editingButtonsActive}
                    onClick={this.cancelEvent}
                />
            </div>
        );
    }
}

export default Task;

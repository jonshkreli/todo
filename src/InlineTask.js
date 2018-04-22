import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {globalDebugEnabled} from "./App";


/**
 * @author Jon Shkreli
 * This will have the shape of a single line displaying title and (done/undone) status
 * These components will be inside TasksContainer
 *
 * properties expected to receive from TasksContainer:
 * - (String) title
 * - (Boolean) done
 * - name: saveTitleChanges
 *   type: Function(title)
 *   description: Callback function. This will be used too as a callback function to send edited title
 *   from <InlineTask/> to <TasksContainer/>
 *
 *
 * state:
 * - (String) title
 *    Will be initialised from this.props.title. It will hold the value in textfield
 * - (Boolean) done
 *    Will be initialised from this.props.done. It will hold the value in checkbox
 * - (Boolean) editingButtonsActive
 *    Default: false. Will be active once user start editing the TextField
 * */
class InlineTask extends Component {

    state = {
        title: this.props.title,
        done: this.props.done,
        editingButtonsActive: false,
    };

    debugEnabled = false; //If true it will print debug messages

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
       if(this.debugEnabled || globalDebugEnabled) console.log(nextProps);
        this.setState({
            title: nextProps.title,
            done: nextProps.done,
            editingButtonsActive: this.props === nextProps
            /*If props change, it means another one is selected. So deactivate the buttons*/
        });
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
    saveTitleEvent = (event) => {
        this.setState({
            editingButtonsActive: false
        });
        this.props.saveTitleChanges(this.state.title);
    };

    /**
     * This function will restore the default value of title
     * This disables save and cancel buttons
     * */
    cancelEvent = (event) => {
        this.setState({
            title: this.props.title,
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
            <div className='inline-task' onClick={this.props.setThisActive}>
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
                    onClick={this.saveTitleEvent}
                />
                <FlatButton
                    label="Cancel"
                    secondary={true}
                    icon={<i className="material-icons">cancel</i>}
                    disabled={!this.state.editingButtonsActive}
                    onClick={this.cancelEvent}
                />
                <FlatButton
                    icon={<i
                        className="material-icons">{(this.state.done ? 'check_box' : 'check_box_outline_blank')}</i>}
                    onClick={this.saveMarkingEvent}
                />
            </div>
        );
    }
}

export default InlineTask;

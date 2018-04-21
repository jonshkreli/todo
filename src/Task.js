import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

/**
 * @author Jon Shkreli
 * This will have the shape of a single line displaying title and (done/undone) status
 * These components will be inside TasksContainer
 * */
class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 'Dummy task',
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        return (
            <div>
                <TextField
                    id="text-field-controlled"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default Task;

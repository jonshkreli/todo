import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

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

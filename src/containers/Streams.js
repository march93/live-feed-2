import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../styles/Streams.css';
import 'typeface-roboto';
import NavBar from './NavBar';

export default class Streams extends Component {

    constructor(props) {
        super(props);
    
        this.state = {

        };
    }

    render() {
        return (
            <div className="Streams">
                <NavBar></NavBar>
                <header className="streams-header">
                    <h1 className="streams-title">Search Live Streams</h1>
                </header>
                <TextField
                    id="bootstrap-input"
                    InputProps={{
                        disableUnderline: true,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        );
    }
}
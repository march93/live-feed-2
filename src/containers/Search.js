import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import '../styles/Search.css';
import NavBar from './NavBar';
import request from 'superagent';

export default class Search extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            inputValue: '',
            messages: []
        };
    }

    updateInputValue(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    searchUser() {
        var state = this.props.getState();
    
        request
            .get('https://polar-shelf-99397.herokuapp.com/v1/api/getMessages')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + state.token)
            .query({ searchValue: this.state.inputValue })
            .end(function(err, res){
                if (res.body) {
                    this.setState({ messages: res.body });
                }
        }.bind(this));
    }

    render() {
        let messageList = (this.state.messages.length === 0) ? '' :
        <Paper className="paper-container">
            <List key="list-box" className="messages-list" subheader={<li />}>
                {this.state.messages.map(item => (
                    <ListItem className="messages-list-item">
                        <ListItemText>
                            <span className="username">{item.username}: </span><span>{item.message}</span>
                        </ListItemText>
                        <span className="time-stamp">[{item.published}]</span>
                    </ListItem>
                ))}
            </List>
        </Paper>;

        return (
            <div className="Search">
                <NavBar></NavBar>
                <header className="search-header">
                    <h1 className="search-title">Search Messages by Username</h1>
                </header>
                <div className="search-div">
                    <TextField
                        id="bootstrap-input"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={event => this.updateInputValue(event)}
                    />
                    <Button onClick={() => this.searchUser()} variant="raised" color="primary" className="search-btn">
                        Search
                    </Button>
                </div>
                <div className="messages-div">
                    {messageList}
                </div>
            </div>
        );
    }
}
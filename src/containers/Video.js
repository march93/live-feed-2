import React, { Component } from 'react';
import '../styles/Video.css';
import NavBar from './NavBar';
import request from 'superagent';
import YouTube from 'react-youtube';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';

export default class Streams extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            videoID: this.props.getState().videoID,
            nextToken: '',
            messagePolling: 0,
            messages: [],
            time: 0
        };
    }

    requestMessages() {
        request
            .get('http://127.0.0.1:5000/v1/api/getStreamMessages')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .query({ videoID: this.state.videoID, pageToken: this.state.nextToken })
            .end(function(err, res){
                if (res) {
                    // append new messages and remove duplicates
                    var newMessages = this.state.messages.concat(res.body.items);
                    newMessages = _.uniqBy(newMessages, function(e) {
                        return e.id;
                    });

                    // display a max of 100 messages at once
                    if (newMessages.length > 100) {
                        newMessages = newMessages.slice(newMessages.length - 100);
                    }

                    this.setState({
                        nextToken: res.body.nextPageToken,
                        messagePolling: res.body.pollingIntervalMillis,
                        messages: newMessages
                    });
                } else {
                    // do nothing
                }
            }.bind(this));
    }
    
    componentDidMount() {
        this.interval = setInterval(() => {
            this.requestMessages();
        }, this.state.messagePolling);
    }

    shouldComponentUpdate(nextProps, nextState) {
        var messageArr = _.isEqual(this.state.messages, nextState.messages);
        var pollTime = this.state.messagePolling !== 0;
        return !messageArr && pollTime;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const propData = this.props.getState();

        let messageList = (this.state.messages.length === 0) ? '' :
        <Paper className="paper-container">
            <List key="list-box" className="messages-list" subheader={<li />}>
                {this.state.messages.map(item => (
                    <ListItem className="messages-list-item">
                        <ListItemText>
                            <span className="username">{item.authorDetails.displayName}: </span><span>{item.snippet.textMessageDetails.messageText}</span>
                        </ListItemText>
                        <span className="time-stamp">[{item.snippet.publishedAt}]</span>
                    </ListItem>
                ))}
            </List>
        </Paper>;

        return (
            <div className="Video">
                <NavBar></NavBar>
                <div className="video-frame">
                    <YouTube
                        videoId={propData.videoID}
                    />
                </div>
                <div className="messages-div">
                    {messageList}
                </div>
            </div>
        );
    }
}
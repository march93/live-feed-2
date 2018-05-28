import React, { Component } from 'react';
import '../styles/Video.css';
import NavBar from './NavBar';
import request from 'superagent';
import YouTube from 'react-youtube';

export default class Streams extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            videoID: this.props.getState().videoID
        };
    }

    render() {
        const propData = this.props.getState();
        console.log(this.state);

        return (
            <div className="Video">
                <NavBar></NavBar>
                <div className="video-frame">
                    <YouTube
                        videoId={propData.videoID}
                    />
                </div>
            </div>
        );
    }
}
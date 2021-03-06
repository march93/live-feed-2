import React, { Component } from 'react';
import '../styles/App.css';
import Routes from "../Routes";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthenticated: false,
            token: '',
            user: null,
            videoID: ''
        };
    }

    callback = (auth, token, user) => {
        this.userAuthenticated(auth, token, user);
    }

    userAuthenticated = (authenticated, curToken, curUser) => {
        this.setState({ 
            isAuthenticated: authenticated,
            token: curToken,
            user: curUser
        });
    }

    setVideo = (videoID) => {
        this.setState({
            videoID: videoID
        });
    }

    getState = () => {
        return this.state;
    }

    render() {
        const childProps = {
            userAuthenticated: this.userAuthenticated,
            setVideo: this.setVideo,
            getState: this.getState
        };
        return (
            <div>
                <Routes childProps={childProps} />
            </div>
        );
    }
}

export default App;

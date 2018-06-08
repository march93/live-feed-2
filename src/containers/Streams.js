import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import '../styles/Streams.css';
import 'typeface-roboto';
import NavBar from './NavBar';
import request from 'superagent';

export default class Streams extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            inputValue: '',
            searchData: null,
            videos: [],
            prevToken: '',
            nextToken: ''
        };
    }

    updateInputValue(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    updateSearchData(data) {
        if (this.state.inputValue === '') {
            data = [];
        }

        this.setState({
            searchData: data,
            videos: data.videos,
            prevToken: data.prevPageToken,
            nextToken: data.nextPageToken
        });
    }

    prevPage() {
        var state = this.props.getState();
    
        request
            .get('http://127.0.0.1:5000/v1/api/getStreamList')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + state.token)
            .query({ email: state.user, searchValue: this.state.inputValue, pageToken: this.state.prevToken })
            .end(function(err, response){
                if (response.body) {
                    this.updateSearchData(response.body);
                }
        }.bind(this)); 
    }

    nextPage() {
        var state = this.props.getState();
    
        request
            .get('http://127.0.0.1:5000/v1/api/getStreamList')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + state.token)
            .query({ email: state.user, searchValue: this.state.inputValue, pageToken: this.state.nextToken })
            .end(function(err, response){
                if (response.body) {
                    this.updateSearchData(response.body);
                }
        }.bind(this));
    }

    playVideo(id) {
        this.props.setVideo(id);
        this.props.history.push('/video');
    }

    searchYT() {
        var state = this.props.getState();
    
        request
            .get('http://127.0.0.1:5000/v1/api/getStreamList')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Bearer ' + state.token)
            .query({ email: state.user, searchValue: this.state.inputValue })
            .end(function(err, response){
                if (response.body) {
                    this.updateSearchData(response.body);
                }
        }.bind(this));
    }

    render() {
        const streamData = this.state.videos;
        let streamList = (streamData.length === 0) ? '' :
        <div className="grid-div">
            <GridList cellHeight={180} className="grid-list">
                {streamData.map(tile => (
                    <GridListTile 
                        className="grid-list-tile"
                        key={tile.thumbnail.url}
                        onClick={() => this.playVideo(tile.id)}>
                        <img src={tile.thumbnail.url} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                        />
                    </GridListTile>
                ))}
            </GridList>
            <div className="page-btns">
                <Button
                    onClick={() => this.prevPage()}
                    variant="raised"
                    color="primary"
                    className="prev-btn"
                    disabled={this.state.prevToken === ''}
                    >
                    Prev
                </Button>
                <Button
                    onClick={() => this.nextPage()}
                    variant="raised"
                    color="primary"
                    className="next-btn"
                    disabled={this.state.nextToken === ''}
                    >
                    Next
                </Button>
            </div>
        </div>;

        return (
            <div className="Streams">
                <NavBar></NavBar>
                <header className="streams-header">
                    <h1 className="streams-title">Search Live Streams</h1>
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
                    <Button onClick={() => this.searchYT()} variant="raised" color="primary" className="search-btn">
                        Search
                    </Button>
                </div>
                <div className="stream-list">
                    {streamList}
                </div>
            </div>
        );
    }
}
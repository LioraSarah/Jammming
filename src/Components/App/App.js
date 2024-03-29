import './App.css';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import React from 'react';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  
  constructor(props) {

    super(props);

    this.state = {searchResults: [],
                  playlistName: "New Playlist",
                  playlistTracks: []
                  }
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  addTrack(track) {
    
    let tracks = this.state.playlistTracks;

    if (!(tracks.find(savedTrack => savedTrack.id === track.id ))) {

        tracks.push(track);
        this.setState({ playlistTracks: tracks });

    }

  }

  removeTrack(track) {

    let tracks = this.state.playlistTracks;

    let newTrackList = tracks.filter(savedTrack => savedTrack.id !== track.id )
    
    this.setState({ playlistTracks: newTrackList });

  }

  updatePlaylistName(name) {

    this.setState({ playlistName: name });

  }

  async savePlaylist() {

    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    console.log(trackURIs);
    await Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
    });

    console.log(this.state.playlistName);

  }

  async search(term) {

    const results = await Spotify.search(term);
    this.setState({ searchResults: results });

  }

  render() {

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          < SearchBar onSearch={this.search} />
          <div className="App-playlist">

            < SearchResults searchResults={this.state.searchResults}
                            onAdd={this.addTrack} />

            < Playlist playlistName={this.state.playlistName} 
                       playlistTracks={this.state.playlistTracks}
                       onRemove={this.removeTrack}
                       onNameChange={this.updatePlaylistName}
                       onSave={this.savePlaylist} />

          </div>
        </div>
      </div>
    );

  }
}

export default App;

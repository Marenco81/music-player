import { useState } from "react";
import { useMusic } from "../contexts/MusicContext";


export const Playlist = () => {

  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const {playlists, createPlaylist, allSongs} = useMusic()

  const filteredSongs = allSongs.filter((song) => {
    const matches = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    song.artist.toLowerCase().includes(searchQuery.toLowerCase());

    const isAlreadyInPlaylist = selectedPlaylist?.songs.some((playlistSong) => playlistSong.id === song.id);

    return matches && !isAlreadyInPlaylist
  });

  const handleCreatePlaylist = () => {
    if(newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim())
      setNewPlaylistName("")
    }
  };
  return (
    <div className="playlist">
      <h2>Playlist</h2>

      {/* Create new playlist */}
      <div className="create-playlist">
        <h3>Create New Playlist</h3>
        <div className="playlist-form">
          <input 
            type="text" 
            placeholder="Playlist name..." 
            className="playlist-input"
            onChange={(e) => setNewPlaylistName(e.target.value)}
            value={newPlaylistName}
          />
          <button 
            className="create-btn"
            onClick={handleCreatePlaylist}
          >Create
          </button>
        </div>
      </div>

      {/* Playlists List */}
      <div className="playlists-list">
        {playlists.length === 0 ? (
          <p className="empty-message">"No playlist created yet"</p>) : (
            playlists.map((playlist, key) => (
              <div className="playlist-item" key={key}>
                <div className="playlist-header">
                  <h3> {playlist.name} </h3>
                  <div className="playlist-actions">
                    <button className="delete-playlist-btn">Delete</button>
                  </div>
                </div>

                {/* Add song search */}
                <div className="add-song-section">
                  <div className="search-container">
                    <input 
                      type="text" 
                      placeholder="search songs to add..."
                      value={
                        selectedPlaylist?.id === playlist.id ? searchQuery : ""
                      }
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setSelectedPlaylist(playlist)
                        setShowDropdown(e.target.value.length > 0)
                      }}
                      onFocus={(e) => {
                        setSelectedPlaylist(playlist)
                        setShowDropdown(e.target.value.length > 0)
                      }}
                      className="song-search-input"
                    />

                    {selectedPlaylist?.id === playlist.id && showDropdown && (
                      <div className="song-dropdown">
                        {filteredSongs.length === 0 ? (
                          <div className="dropdown-item no-results">
                            No songs found
                          </div>
                        ) : (
                          filteredSongs.map((song, key) => (
                          <div key={key} className="dropdown-item">
                            <span> {song.title} </span>
                            <span> {song.artist} </span>
                          </div>
                        ))
                      )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  )
}

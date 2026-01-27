import { AllSongs, MusicPlayer, Playlist } from "./components";
import {BrowserRouter, Routes, Route} from "react-router";

function App() {
  
  return (
    <BrowserRouter>
    
      <div className="app">
        {/* {<Navbar></Navbar>} */}
        <main className="app-main">
          <div className="player-section">
            <MusicPlayer></MusicPlayer>

          </div>
          <div className="content-section">
            <Routes>
              <Route path="/" element={<AllSongs/>}/>
              <Route path="/playlist" element={< Playlist/>} />
            </Routes>
          </div>

        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

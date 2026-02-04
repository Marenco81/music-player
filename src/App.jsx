import { AllSongs, MusicPlayer, Playlist } from "./components";
import {BrowserRouter, Routes, Route} from "react-router";
import { MusicProvider } from "./contexts/MusicContext";

function App() {
  
  return (
    <BrowserRouter>
      <MusicProvider>
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
      </MusicProvider>
    </BrowserRouter>
  )
}

export default App

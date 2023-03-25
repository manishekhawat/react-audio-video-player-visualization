import "./App.css";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";
import VideoPlayer from "./components/videoPlayer/VideoPlayer";
function App() {
  return (
    <>
      <VideoPlayer />
      <AudioPlayer src="/assets/video.mp4" />
    </>
  );
}

export default App;

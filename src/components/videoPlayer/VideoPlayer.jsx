import React, { useRef } from "react";

import useVideoPlayer from "../../hooks/useVideoPlayer";
import useKeypress from "../../hooks/useKeyPress";

import ThumbnailImage from "./controls/ThumbnailImage";
import Timeline from "./controls/Timeline";
import PlayPauseControl from "./controls/PlayPauseControl";
import VolumeControl from "./controls/VolumeControl";
import TimeProgress from "./controls/TimeProgress";
import CaptionsControl from "./controls/CaptionsControl";
import SpeedControl from "./controls/SpeedControl";
import MiniPlayerControl from "./controls/MiniPlayerControl";
import FullscreenControl from "./controls/FullscreenControl";
import TheaterControl from "./controls/TheaterControl";
import VideoControl from "./controls/VideoControl";

function VideoPlayer() {
  const videoElement = useRef(null);
  const volumeElement = useRef(null);
  const timelineElement = useRef(null);
  const previewImgElement = useRef(null);
  const thumbnailImgElement = useRef(null);
  const trackElement = useRef(null);

  const {
    isPlaying,
    isMuted,
    isTheaterMode,
    isFullscreenMode,
    progress,
    speed,
    volume,
    currentTime,
    totalTime,
    togglePlay,
    handleVideoSpeed,
    toggleMute,
    toggleCaptions,
    handlePlay,
    handlePause,
    handleMiniMode,
    handleTheaterMode,
    handleFullscreenMode,
  } = useVideoPlayer({
    videoElement,
    volumeElement,
    timelineElement,
    previewImgElement,
    thumbnailImgElement,
    trackElement,
  });

  useKeypress("p", () => {
    handlePlay();
  });
  useKeypress("o", () => {
    handlePause();
  });
  useKeypress("f", () => {
    handleFullscreenMode();
  });
  useKeypress("m", () => {
    handleMiniMode();
  });
  useKeypress("t", () => {
    handleTheaterMode();
  });
  useKeypress("c", () => {
    toggleCaptions();
  });
  useKeypress("m", () => {
    toggleMute();
  });

  return (
    <>
      <div className="video-container paused" data-volume-level="high">
        <ThumbnailImage elementRef={thumbnailImgElement} />
        <div className="video-controls-container">
          <Timeline
            timelineElementRef={timelineElement}
            previewImgElementRef={previewImgElement}
          />
          <div className="controls">
            <PlayPauseControl isPlaying={isPlaying} togglePlay={togglePlay} />
            <VolumeControl
              isMuted={isMuted}
              volumeElementRef={volumeElement}
              volume={volume}
              toggleMute={toggleMute}
            />
            <TimeProgress
              currentTime={currentTime}
              totalTime={totalTime}
              progress={progress}
            />
            <CaptionsControl toggleCaptions={toggleCaptions} />
            <SpeedControl speed={speed} handleVideoSpeed={handleVideoSpeed} />
            <MiniPlayerControl miniPlayer={handleMiniMode} />
            <TheaterControl
              isTheaterMode={isTheaterMode}
              theaterPlayer={handleTheaterMode}
            />
            <FullscreenControl
              isFullscreenMode={isFullscreenMode}
              fullScreenPlayer={handleFullscreenMode}
            />
          </div>
        </div>
        <VideoControl
          videoElementRef={videoElement}
          videoSrc={"/assets/video.mp4"}
          subtitleSrc={"/assets/subtitle.vtt"}
          togglePlay={togglePlay}
          trackRef={trackElement}
        />
      </div>
    </>
  );
}

export default VideoPlayer;

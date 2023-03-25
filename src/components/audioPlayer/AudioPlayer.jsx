import React, { useState, useRef } from "react";
import styled from "styled-components";

const Phone = styled.div`
  width: 300px;
  height: 600px;
  background-color: #f0f0f0;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  height: 60px;
  background-color: #222;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  height: 10px;
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  width: ${({ progress }) => progress}%;
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

const Time = styled.div`
  font-size: 14px;
`;

function AudioPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const currentTime = audio.currentTime;
    setCurrentTime(currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    const duration = audio.duration;
    setDuration(duration);
  };

  const handleProgress = () => {
    const audio = audioRef.current;
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    setProgress(progress);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const progress =
      (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100;
    const currentTime = (audio.duration / 100) * progress;
    setCurrentTime(currentTime);
    audio.currentTime = currentTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const [progress, setProgress] = useState(0);

  return (
    <Phone>
      <Header>Audio Player</Header>
      <Content>
        <Button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</Button>

        <img src={"/assets/preview/poster.jpeg"} alt="poster image" />
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onProgress={handleProgress}
          src={src}
          poster={"/assets/preview/poster.jpeg"}
        ></audio>
        <ProgressBarContainer onClick={handleSeek}>
          <ProgressBar progress={progress} />
        </ProgressBarContainer>
        <ControlContainer>
          <Time>{formatTime(currentTime)}</Time>
          <Time>{formatTime(duration)}</Time>
        </ControlContainer>
      </Content>
    </Phone>
  );
}
export default AudioPlayer;

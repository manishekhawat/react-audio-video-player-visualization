import { useState, useEffect, useCallback } from "react";

const useVideoPlayer = ({
  videoElement,
  volumeElement,
  timelineElement,
  thumbnailImgElement,
  previewImgElement,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [isMiniPlayerMode, setIsMiniPlayerMode] = useState(false);
  const [isCaptionsOn, setIsCaptionsOn] = useState(false);
  const [isScrubbingMode, setIsScrubbingMode] = useState(false);
  const [volume, setVolume] = useState(10);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");

  const handleVolumeSliderInput = (e) => {
    const instance = videoElement.current;
    const value = Number(e.target.value);

    if (value === 0) {
      instance.muted = true;
      setIsMuted(true);
    } else {
      instance.muted = false;
      setIsMuted(false);
    }

    setVolume(value);
    instance.volume = value / 100;
  };

  const handleVideoVolumeChange = useCallback(() => {
    const instance = videoElement.current;
    const volumeSliderInstance = volumeElement.current;

    setVolume(instance.volume * 100);
    setIsMuted(instance.muted);
    volumeSliderInstance.value = `${Math.floor(instance.volume * 100)}`;
  }, [videoElement.current, volumeElement.current]);

  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  function formatDuration(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`;
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(formatDuration(videoElement.current.currentTime));
    const percent =
      videoElement.current.currentTime / videoElement.current.duration;
    setProgress(parseInt(percent * 100));
    timelineElement.current.style.setProperty("--progress-position", percent);
  };

  const handleTotalTime = () => {
    setTotalTime(formatDuration(videoElement.current.duration));
  };

  const handleTimelineUpdate = (e) => {
    const rect = timelineElement.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    const previewImgNumber = Math.max(
      1,
      Math.floor((percent * videoElement.current.duration) / 5)
    );
    const previewImgSrc = `/assets/preview/preview${previewImgNumber}.jpg`;
    previewImgElement.current.src = previewImgSrc;
    timelineElement.current.style.setProperty("--preview-position", percent);

    if ((e.buttons & 1) === 1) {
      e.preventDefault();
      thumbnailImgElement.current.src = previewImgSrc;
      timelineElement.current.style.setProperty("--progress-position", percent);
    }
  };

  const toggleScrubbing = (e) => {
    const rect = timelineElement.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    const isScrubbing = (e.buttons & 1) === 1;
    videoElement.current.parentElement.classList.toggle("scrubbing");

    if (isScrubbing) {
      setIsPlaying(false);
      setIsScrubbingMode(true);
    } else {
      setIsPlaying(true);
      setIsScrubbingMode(false);
    }
    videoElement.current.currentTime = percent * videoElement.current.duration;

    handleTimelineUpdate(e);
  };

  const handleLoadedMetaData = useCallback(() => {
    const volumeSliderInstance = volumeElement.current;

    if (volumeSliderInstance) {
      videoElement.current.volume = volume / 100;
      volumeSliderInstance.value = volume.toString();
    }
  }, [volumeElement.current, volume]);

  useEffect(() => {
    const instance = videoElement.current;
    const volumeSliderInstance = volumeElement.current;

    if (volumeSliderInstance) {
      if (instance.muted) {
        volumeSliderInstance.value = "0";
      } else {
        volumeSliderInstance.value = `${Math.floor(instance.volume * 100)}`;
      }
    }
  }, [videoElement.current, volumeElement.current]);
  const handleDocumentMouseMove = (e) => {
    if (isScrubbingMode) handleTimelineUpdate(e);
  };

  const handleDocumentMouseUp = (e) => {
    if (isScrubbingMode) toggleScrubbing(e);
  };
  useEffect(() => {
    const instance = videoElement.current;
    const volumeSliderInstance = volumeElement.current;
    const timelineInstance = timelineElement.current;
    if (videoElement.current) {
      volumeSliderInstance &&
        volumeSliderInstance.addEventListener("input", handleVolumeSliderInput);
      instance.addEventListener("volumechange", handleVideoVolumeChange);
      instance.addEventListener("loadedmetadata", handleLoadedMetaData);
      instance.addEventListener("timeupdate", handleTimeUpdate);
      instance.addEventListener("loadeddata", handleTotalTime);
      timelineInstance.addEventListener("mousedown", toggleScrubbing);
      timelineInstance.addEventListener("mousemove", handleTimelineUpdate);
    }
    return () => {
      volumeSliderInstance &&
        volumeSliderInstance.removeEventListener(
          "input",
          handleVolumeSliderInput
        );
      instance &&
        instance.removeEventListener("volumechange", handleVideoVolumeChange);
      instance &&
        instance.removeEventListener("loadedmetadata", handleLoadedMetaData);
      instance && instance.removeEventListener("timeupdate", handleTimeUpdate);
      instance && instance.removeEventListener("loadeddata", handleTotalTime);
      timelineInstance &&
        timelineInstance.removeEventListener("mousedown", toggleScrubbing);
      timelineInstance &&
        timelineInstance.removeEventListener("mousemove", handleTimelineUpdate);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
    };
  }, [videoElement, volumeElement, timelineElement]);

  const playPlayer = () => {
    setIsPlaying(true);
  };

  const pausePlayer = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    isPlaying ? videoElement.current.play() : videoElement.current.pause();
  }, [isPlaying, videoElement.current]);

  const handleVideoSpeed = (event) => {
    const currentSpeed = Number(event.target.value);
    videoElement.current.playbackRate = currentSpeed;
    setSpeed(currentSpeed);
  };

  function toggleCaptions() {
    const captions = videoElement.current.textTracks[0];
    captions.mode = "hidden";
    const isHidden = isCaptionsOn === false;
    setIsCaptionsOn(!isCaptionsOn);
    captions.mode = isHidden ? "showing" : "hidden";
    videoElement.current.parentElement.classList.toggle("captions", isHidden);
  }

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const theaterPlayer = () => {
    setIsTheaterMode(!isTheaterMode);
    videoElement.current.parentElement.classList.toggle("theater");
  };
  const miniPlayer = () => {
    setIsMiniPlayerMode(!isMiniPlayerMode);
    if (videoElement.current.parentElement.classList.contains("mini-player")) {
      document.exitPictureInPicture();
    } else {
      videoElement.current.requestPictureInPicture();
    }
    videoElement.current.parentElement.classList.toggle("mini-player");
  };

  const fullScreenPlayer = () => {
    setIsFullscreenMode(!isFullscreenMode);
    if (document.fullscreenElement == null) {
      videoElement.current.parentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    videoElement.current.parentElement.classList.toggle("full-screen");
  };

  useEffect(() => {
    isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [isMuted, videoElement.current]);

  return {
    isPlaying,
    isMuted,
    isTheaterMode,
    isFullscreenMode,
    isMiniPlayerMode,
    isCaptionsOn,
    isScrubbingMode,
    progress,
    speed,
    volume,
    currentTime,
    totalTime,
    togglePlay,
    handleVideoSpeed,
    toggleMute,
    toggleCaptions,
    playPlayer,
    pausePlayer,
    theaterPlayer,
    fullScreenPlayer,
    miniPlayer,
  };
};

export default useVideoPlayer;

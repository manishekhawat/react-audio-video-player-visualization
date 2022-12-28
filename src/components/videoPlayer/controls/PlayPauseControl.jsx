import React from "react";
import { PlayBtnIcon, PauseBtnIcon } from "../icons/PlayPauseIcon";

function PlayPauseControl(props) {
  return (
    <button className="play-pause-btn" onClick={props.togglePlay}>
      {!props.isPlaying ? <PlayBtnIcon /> : <PauseBtnIcon />}
    </button>
  );
}

export default PlayPauseControl;

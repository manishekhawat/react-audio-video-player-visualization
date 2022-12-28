import React from "react";
import {
  VolumeHighBtnIcon,
  VolumeMutedBtnIcon,
  VolumeLowBtnIcon,
} from "../icons/VolumeIcon";

function VolumeControl(props) {
  return (
    <div className="volume-container">
      <button className="mute-btn" onClick={props.toggleMute}>
        {props.isMuted ? (
          <VolumeMutedBtnIcon />
        ) : props.volume > 50 ? (
          <VolumeHighBtnIcon />
        ) : (
          <VolumeLowBtnIcon />
        )}
      </button>
      <input
        className="volume-slider"
        type="range"
        min="0"
        max="100"
        step="any"
        ref={props.volumeElementRef}
      />
    </div>
  );
}

export default VolumeControl;

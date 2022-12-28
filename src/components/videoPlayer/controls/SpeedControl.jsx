import React from "react";

function SpeedControl(props) {
  return (
    <button className="speed-btn wide-btn">
      <select
        className="velocity"
        value={props.speed}
        onChange={(e) => props.handleVideoSpeed(e)}
      >
        <option value="0.25">0.25x</option>
        <option value="0.50">0.50x</option>
        <option value="0.75">0.75x</option>
        <option value="1">1x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="1.75">1.75x</option>
        <option value="2">2x</option>
      </select>
    </button>
  );
}

export default SpeedControl;

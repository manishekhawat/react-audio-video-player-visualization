import React from "react";

function TimeProgress(props) {
  return (
    <div className="duration-container">
      <div className="current-time">{props.currentTime}</div>/
      <div className="total-time">{props.totalTime}</div>
      <div>| {props.progress}%</div>
    </div>
  );
}

export default TimeProgress;

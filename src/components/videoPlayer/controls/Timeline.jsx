import React from "react";

function Timeline(props) {
  return (
    <div className="timeline-container" ref={props.timelineElementRef}>
      <div className="timeline">
        <img
          className="preview-img"
          alt="play video"
          ref={props.previewImgElementRef}
        />
        <div className="thumb-indicator"></div>
      </div>
    </div>
  );
}

export default Timeline;

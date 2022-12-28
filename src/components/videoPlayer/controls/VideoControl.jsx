import React from "react";

function VideoControl(props) {
  return (
    <video
      src={props.videoSrc}
      type="video/mp4"
      ref={props.videoElementRef}
      onClick={props.togglePlay}
    >
      <track
        kind="captions"
        srcLang="en"
        src={props.subtitleSrc}
        ref={props.trackRef}
      />
    </video>
  );
}

export default VideoControl;

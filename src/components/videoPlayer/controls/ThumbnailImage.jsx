import React from "react";

function ThumbnailImage(props) {
  return (
    <img className="thumbnail-img" alt="thumbnail" ref={props.elementRef} />
  );
}

export default ThumbnailImage;

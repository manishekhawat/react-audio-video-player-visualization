import React from "react";
import { CaptionBtnIcon } from "../icons/CaptionIcon";

function CaptionsControl(props) {
  return (
    <button className="captions-btn" onClick={props.toggleCaptions}>
      <CaptionBtnIcon />
    </button>
  );
}

export default CaptionsControl;

import React from "react";
import { FullScreenBtnIcon, ExitScreenBtnIcon } from "../icons/FullScreenIcon";
function FullscreenControl(props) {
  return (
    <button className="full-screen-btn" onClick={props.fullScreenPlayer}>
      {!props.isFullscreenMode ? <FullScreenBtnIcon /> : <ExitScreenBtnIcon />}
    </button>
  );
}

export default FullscreenControl;

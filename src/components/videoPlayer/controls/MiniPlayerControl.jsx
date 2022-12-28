import React from "react";
import { MiniPlayerBtnIcon } from "../icons/MiniPlayerIcon";

function MiniPlayerControl(props) {
  return (
    <button className="mini-player-btn" onClick={props.miniPlayer}>
      <MiniPlayerBtnIcon />
    </button>
  );
}

export default MiniPlayerControl;

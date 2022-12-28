import React from "react";
import { TheaterTallBtnIcon, TheaterWideBtnIcon } from "../icons/TheaterIcon";

function TheaterControl(props) {
  return (
    <button className="theater-btn" onClick={props.theaterPlayer}>
      {props.isTheaterMode ? <TheaterTallBtnIcon /> : <TheaterWideBtnIcon />}
    </button>
  );
}

export default TheaterControl;

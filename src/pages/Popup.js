import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box1">
      <div className="box1">
        <span className="close-icon1" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;
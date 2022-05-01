import React from "react";
import ReactDom from "react-dom";
import cross from "../../assets/cross.svg";
import "./modal.css";
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className="containerOverlay" />
      <div className="containerOverlayWrapper">
        <div style={{ position: "relative" }}>
          <button
            style={{
              position: "absolute",
              top: 0,
              right: 3,
              borderRadius: "10px",
              padding: 2,
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <img style={{ width: "20px" }} src={cross} alt="cross" />
          </button>
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};
export default Modal;

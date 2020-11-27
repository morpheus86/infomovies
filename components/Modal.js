"use strict";

const Modal = (props) => (
  <div>
    <div className="modal-background" onClick={() => props.close()}></div>
    <div className="modal">{props.children}</div>
  </div>
);

export default Modal;

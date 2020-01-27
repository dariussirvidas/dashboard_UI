import React from "react";
import "./sticker.scss";

function Sticker() {
  return (
    <div>
      <div className="tile-success">
        <h3 className="cl-h3">Service name</h3>
        <p className="cl-copy-14">Response time:9000ms </p>
        <p className="cl-copy-14">Last Failure: Yesturday </p>
        <p className="cl-copy-14">Next Check in: Today </p>
      </div>
      <div className="tile-fail">
        <h3 className="cl-h3">Service name</h3>
        <p className="cl-copy-14">Response time: </p>
        <p className="cl-copy-14">Last Failure: </p>
        <p className="cl-copy-14">Next Check in: </p>
      </div>
    </div>
  );
}

export default Sticker;

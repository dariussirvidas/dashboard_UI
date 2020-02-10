import React from "react";
import "./sticker.scss";

function Sticker(props) {
  return (
      <div className={
          "tile-unclear " +
          (props.domainPing.status === "TimedOut" && "tile-fail ") + " " +
          (props.domainPing.status === "Success" && "tile-success ") + " " +
          ((props.domainPing.message !== undefined && "tile-fail "))
      }
      >
          <h3 className="cl-h3">Service name: {props.item.service_Name}</h3>
          <p className="cl-copy-14">
              Response time:
              {
                  props.domainPing &&
                  <>
                      {props.domainPing.latencyMS}
                  </>

              }
          </p>
          {/*<p className="cl-copy-14">Response code: {domainPingResponseCode}</p>*/}
          <p className="cl-copy-14">Last Failure: {props.item.last_Fail.slice(0, 10)} {props.item.last_Fail.slice(11, 16)}</p>
          <p className="cl-copy-14">Next Check in: {props.checkIn} </p>
      </div>
  );
}

export default Sticker;

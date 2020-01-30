import React from "react";
import "./sticker.scss";

function Sticker(props) {
  return (
      <div className={
          "tile-unclear " +
          (props.domainPing.status === "TimedOut" && "tile-fail ") + " " +
          (props.domainPing.status === "Success" && "tile-success ")
      }
      >
          <h3 className="cl-h3">Service name: {props.item.service_Name}</h3>
          <p className="cl-copy-14">
              Response time:
              {
                  props.domainPing &&
                  <>
                      {props.domainPing.latencyMS}
                      {console.log("domainpingerror: ", props.domainPingError)}
                  </>

              }
          </p>
          {/*<p className="cl-copy-14">Response code: {domainPingResponseCode}</p>*/}
          <p className="cl-copy-14">Last Failure: {props.item.last_Fail}</p>
          <p className="cl-copy-14">Next Check in: {props.item.interval_Ms} </p>
      </div>
  );
}

export default Sticker;

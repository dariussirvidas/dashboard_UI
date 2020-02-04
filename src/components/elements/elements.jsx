import React from "react";
import "./elements.scss";


export const LoadingSpinner = () => <div className="lds-facebook">
    <div></div>
    <div></div>
    <div></div>
</div>;

export const ErrorMessage = (props) => <div>
    <i className="eva eva-3x eva-alert-circle-outline"></i>
    <p>{props.message}</p>
</div>;
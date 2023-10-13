import React from "react";
import "./Spinner.css";

export default function LoadingSpinner(props) {
    return (
        <div className="spinner-container" style={{display:props.loading?'flex':'none'}}>
            <div className="loading-spinner" style={{width:props.width, height:props.height, borderColor:props.borderColor, borderTopColor:props.borderTopColor}}>
            </div>
        </div>
    );
}
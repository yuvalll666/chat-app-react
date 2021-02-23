import React from "react";
import "./InfoBar.css";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
import { ucfirst } from "../../utils/functions";

function InfoBar({ room, name }) {
    return (
        <div className="info-bar">
            <div className="left-inner-container">
                <img
                    className="online-icon"
                    src={onlineIcon}
                    alt="Online"
                />
                <h3>{ucfirst(name)}</h3>
            </div>
            <div className="right-inner-container">
                <h3 className="display-name">Room - ( {ucfirst(room)} )</h3>
                <a href="/">
                    <img src={closeIcon} alt="Close" />
                </a>
            </div>
        </div>
    );
}

export default InfoBar;

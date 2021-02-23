import React from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user, time }, currentUserName }) => {
    // Set flag
    let isSentByCurrentUser = false;

    const trimmedUserName = currentUserName.trim().toLowerCase();

    // Checks if the user logged is the user sending the message
    if (user === trimmedUserName) {
        // Set flag to true
        isSentByCurrentUser = true;
    }

    return isSentByCurrentUser ? (
        <div className="message-container justify-end">
            <p className="sent-text pr-10">{trimmedUserName}</p>
            <div className="message-box background-blue self">
                <p className="message-text color-white">
                    {ReactEmoji.emojify(text)}
                </p>
                <em>{time}</em>
            </div>
        </div>
    ) : (
        <div className="message-container justify-start">
            <div className="message-box background-light other">
                <p className="message-text color-dark">
                    {ReactEmoji.emojify(text)}
                </p>
                <em className="color-dark">{time}</em>
            </div>
            <p className="sent-text pl-10 ">{user}</p>
        </div>
    );
};

export default Message;

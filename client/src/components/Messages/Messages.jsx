import React from "react";
import ReactScrollAbleFeed from "react-scrollable-feed";

import Message from "./Message/Message";
import "./Messages.css";

const Messages = ({ messages, name }) => {
    // Mapping all messages and creating a card
    const displayMessages = messages.map((msg, index) => (
        <div key={index}>
            <Message message={msg} currentUserName={name} />
        </div>
    ));

    return (
        <ReactScrollAbleFeed className="messages">
            {displayMessages}
        </ReactScrollAbleFeed>
    );
};

export default Messages;

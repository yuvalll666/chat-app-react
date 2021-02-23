import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users }) => {
    // Mapping users name in room to display
    const displayUsers = users.map(({ name }, index) => (
        <h2 className="active-item" key={index}>
            <img src={onlineIcon} alt="Online Icon" />
            {name}
        </h2>
    ));

    return (
        <div className="text-container">
            <div>
                <h1>
                    Realtime Chat Application{" "}
                    <span role="img" aria-label="emoji">
                        💬
                    </span>
                </h1>
                <h2>Created with React, Express, Node and Socket.IO</h2>
            </div>
            {users ? (
                <div>
                    <h1>People currently chatting:</h1>
                    <div className="active-container">
                        <div>{displayUsers}</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default TextContainer;

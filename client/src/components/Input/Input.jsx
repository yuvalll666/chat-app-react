import React from "react";
import "./Input.css";

function Input({ message, setMessage, sendMessage }) {
    /**
     * Making 'Enter' key send message and
     * Making 'Shift + Enter' key break line
     * @param {Event} e - onKeyPress event
     */
    const shiftEnterLineBreak = (e) => {
        if (e.shiftKey && e.key === "Enter") {
            return setMessage(e.target.value);
        }

        if (e.key === "Enter") return sendMessage(e);

        return;
    };

    return (
        <form className="form">
            <textarea
                rows="1"
                autoFocus
                className="input"
                placeholder="Type a message..."
                value={message}
                // Set message to the input's value
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => shiftEnterLineBreak(e)}
            ></textarea>
            <button className="send-button" onClick={(e) => sendMessage(e)}>
                Send
            </button>
        </form>
    );
}

export default Input;

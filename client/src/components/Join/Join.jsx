import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./Join.css";

function Join() {
    const [Name, setName] = useState("");
    const [Room, setRoom] = useState("");
    const inputRef = useRef();
    const btnRef = useRef();
    const { addToast } = useToasts();

    /**
     * Check if user filled both name and room inputs
     * @param {Event} e - onClick event
     */
    function checkInputs(e) {
        if (!Room || !Name) {
            e.preventDefault();
            return addToast("Please fill both inputs!", {
                appearance: "error",
            });
        }

        return;
    }

     /**
     * When user click 'Enter' key make button click
     * @param {Event} e - onKeyPress event
     */
    function enterKeyPress(e) {
        return e.key === "Enter" ? btnRef.current.click() : null;
    }

    return (
        <div className="join-wrapper">
            <div className="join-container">
                <h1 className="heading">Join</h1>
                <div>
                    <input
                        autoFocus
                        type="text"
                        placeholder="User Name..."
                        className="join-input"
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={(e) => enterKeyPress(e)}
                    />
                </div>
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Room Name..."
                        className="join-input mt-20"
                        onChange={(e) => setRoom(e.target.value)}
                        onKeyPress={(e) => enterKeyPress(e)}
                    />
                </div>
                <Link
                    onClick={(e) => checkInputs(e)}
                    to={`/chat?name=${Name}&room=${Room}`}
                >
                    <button
                        ref={btnRef}
                        className="button mt-20"
                        type="submit"
                    >
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Join;

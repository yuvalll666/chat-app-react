import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import MessagesComp from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import TextContainer from "../TextContainer/TextContainer";
import { endPoint, ioConnectionOptions } from "../config.json";
import "./Chat.css";

let socket;

const Chat = ({ location }) => {
    const [Name, setName] = useState("");
    const [Room, setRoom] = useState("");
    const [Message, setMessage] = useState("");
    const [Messages, setMessages] = useState([]);
    const [UsersList, setUsersList] = useState([]);

    const { addToast } = useToasts();
    const history = useHistory();

    useEffect(() => {
        // Getting userName and roomName from query
        const { name, room } = queryString.parse(location.search);

        // Create a connection to socket.io
        socket = io(endPoint, ioConnectionOptions);

        setRoom(room);
        setName(name);

        // Send userName and roomName to server
        socket.emit("join", { name, room }, (error) => {
            if (error) {
                addToast(error, { appearance: "error" });
                history.push("/");
            }
        });
    }, [endPoint, location.search]);

    useEffect(() => {
        // Send each message to the server and set old Messages with new ones
        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Getting room and users informations from server
        socket.on("roomData", ({ users }) => {
            // Set usersList to user inside the room
            setUsersList(users);
        });
    }, []);

    /**
     * Send a message to the server
     * @param {Event} event - click event
     */
    const sendMessage = (event) => {
        event.preventDefault();

        // If Message exists send
        if (Message) socket.emit("sendMessage", Message, () => setMessage(""));
    };
    return (
        <div className="outer-container">
            <div className="container">
                <InfoBar room={Room} name={Name} />
                <MessagesComp messages={Messages} name={Name} />
                <Input
                    message={Message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
            <TextContainer users={UsersList} />
        </div>
    );
};

export default Chat;

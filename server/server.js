const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");
const formatMessage = require("./utils/messages");
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
} = require("./utils/users");

app.use(cors());
app.use(require("morgan")("dev"));
app.use(express.json());

const botName = "Chat bot";

// Create connection and listen to sockets
io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        // Create new user
        const { error, user } = addUser(socket.id, name, room);

        // Returns error if exists
        if (error) return callback(error);

        // If user created successfully
        if (user) {
            // Join user to specific room
            socket.join(user.room);

            // Sends room information {users list, room name} to client
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room),
            });

            // Sends a welcome message to client
            socket.emit(
                "message",
                formatMessage(
                    botName,
                    `${user.name}, Welcom to room ${user.room}`
                )
            );

            // Sends user joined message to everyone in the room exept the actual user
            socket.broadcast
                .to(user.room)
                .emit(
                    "message",
                    formatMessage(botName, `${user.name} has joined the chat!`)
                );

            // Empty callback if every thing ok
            callback();
        }
    });

    socket.on("sendMessage", (messageText, callback) => {
        // Get user by id
        const user = getUser(socket.id);

        // If user not exists send error message to client
        if (!user) return callback({ error: "Failed to send a message" });

        // Send the message to the specific room
        io.to(user.room).emit("message", formatMessage(user.name, messageText));

        // Empty callback if every thing ok
        callback();
    });

    // When user leave
    socket.on("disconnect", () => {
        // Remove user from users list and assign it
        const user = removeUser(socket.id);

        // If user not exists bail
        if (!user) return;

        // Sends user left message to the specific room
        io.to(user.room).emit(
            "message",
            formatMessage(botName, `${user.name} has left the room.`)
        );

        // Send updated room information when user leave
        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room),
        });
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

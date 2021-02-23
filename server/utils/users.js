const users = [];

/**
 * Add a user to users list and returns him
 * @param {String} id - user's id
 * @param {String} name - username
 * @param {String} room - room name
 */
const addUser = (id, name, room) => {
    // Trim spaces and lower casing the strings
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Search the user in the users array
    const existingUser = users.find(
        (user) => user.room === room && user.name === name
    );

    // If user already exists in the array send error
    if (existingUser) return { error: "Username is already taken." };

    // Create user and add to users array
    const user = { id, name, room };
    users.push(user);

    // Returns the created user
    return { user };
};

/**
 * Remove a user from the users array
 * @param {String} id - users id
 */
const removeUser = (id) => {
    // Getting the user index in the array
    const index = users.findIndex((user) => user.id === id);

    // If user exists remove him from users array
    if (index !== -1) return users.splice(index, 1)[0];
};

/**
 * Get user by id
 * @param {String} id - users id
 */
const getUser = (id) => {
    // Find a user by id in users array
    return users.find((user) => user.id === id);
};

/**
 * Get all the users in the same room
 * @param {String} room - room name
 */
const getUsersInRoom = (room) => {
    // Filter out the users with the same room name
    return users.filter((user) => user.room === room);
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
};

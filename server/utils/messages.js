const moment = require("moment");

/**
 * Formating message object to add timestamp
 * @param {String} user - username
 * @param {String} text - message content
 */
function formatMessage(user, text) {
    return {
        user,
        text,
        time: moment().format("h:mm a"),
    };
}

module.exports = formatMessage;

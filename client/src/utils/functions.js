/**
 * Uppercase first letter of each word in a string
 * @param {String} str
 */
export function ucfirst(str) {
    str = str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
    return str;
}

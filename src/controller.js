const {sendText, sendJSON} = require("./utilities.js")

module.exports = function(req, res) {
	sendJSON(req, res, {msg: "we fucking mingin ey"})
}
const cnf = require("./config/serverconfig.json");

const {sendText, sendJSON} = require("./utilities.js")

const hostPath = cnf.host + ":" + cnf.port

module.exports = function(req, res) {

	const url = new URL(req.url, hostPath)

	const endpoint = url.pathname
	const regex = /^\/(html|css|js|img)\/[\w-]+\.(html|css|js|jpe?g)/

	const regexRes = endpoint.match(regex)
	console.log(regexRes)
	if (regexRes) {
		sendJSON(req, res, regexRes)
		return
	}

	sendJSON(req, res, {msg: "we fucking mingin ey", endpoint: endpoint}, 404)
}
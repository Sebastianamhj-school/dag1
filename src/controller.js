const cnf = require("./config/serverconfig.json");

const {sendText, sendJSON, sendFile, redirect} = require("./utilities.js")

const hostPath = cnf.host + ":" + cnf.port

module.exports = function(req, res) {

	const url = new URL(req.url, hostPath)

	const endpoint = url.pathname
	if (endpoint === "/") {
		redirect(res, "https://localhost:6969/html/index.html")
		return
	}
	const regex = /^\/(html|css|js|img)\/[\w-]+\.(html|css|js|jpe?g)/

	const regexRes = endpoint.match(regex)
	console.log(regexRes)
	if (regexRes) {
		sendFile(req, res, cnf.docroot + regexRes[0])
		return
	}

	sendJSON(req, res, {msg: "we fucking mingin ey", endpoint: endpoint}, 404)
}
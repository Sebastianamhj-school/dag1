const { cat } = require("./api/cat");
const cnf = require("./config/serverconfig.json");

const {sendText, sendJSON, sendFile, redirect, logger, streamFile} = require("./utilities.js")
const api = {
	"cat": require("./api/cat"),
	"duck": require("./api/duck"),
}

const hostPath = cnf.host + ":" + cnf.port

module.exports = function(req, res) {
	logger(req, res)

	const url = new URL(req.url, hostPath)

	const endpoint = url.pathname
	if (endpoint === "/") {
		redirect(res, "http://localhost:6969/html/index.html")
		return
	}
	const siteRegex = /^\/(html|css|js|img)\/[\w-]+\.(html|css|js|jpe?g)/
	const apiRegex = /^\/api\/(?<route>\w+)(?<param>\/\d+)?$/

	const regexRes = endpoint.match(siteRegex)
	console.log(regexRes)
	if (regexRes) {
		streamFile(req, res, cnf.docroot + regexRes[0])
		return
	}

	const matchedApi = endpoint.match(apiRegex)
	if (matchedApi) {
		if(api[matchedApi.groups.route]) {
			if(api[matchedApi.groups.route][req.method]) {
				api[matchedApi.groups.route][req.method].handler(req, res, matchedApi.groups.param)
				return
			}
			sendJSON(req, res, {msg: "wtf u tryin'", endpoint: endpoint}, 405)
			return
		}
	}

	sendJSON(req, res, {msg: "we fucking mingin ey", endpoint: endpoint}, 404)
}
exports.sendText = function(req, res, msg, status = 200) {
	res.statusCode = status
	res.setHeader("Content-type", "text/plain")
	res.end(msg)
}

exports.sendJSON = function(req, res, msg, status = 200) {
	res.statusCode = status
	res.setHeader("Content-type", "application/json")
	res.end(JSON.stringify({message: msg}))
}
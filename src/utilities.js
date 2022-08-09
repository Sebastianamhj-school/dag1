const {readFile} = require("fs")
const { extname } = require("path")
const mimetypes = require("./mimetypes")

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

exports.sendFile = function(req, res, filename) {
	const extension = extname(filename)
	const mimetype = mimetypes[extension].type
	readFile(filename, function(err, filecontent) {
		if (err) {
			exports.sendJSON(req, res, {"error": err.message}, 404)
			return
		}
		res.statusCode = 200
		res.setHeader("Content-type", mimetype)
		res.end(filecontent)
	})
}

exports.redirect = function(res, url) {
	res.statusCode = 301
	res.setHeader("Location", url)
	res.end()
}
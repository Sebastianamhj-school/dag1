const { Console } = require("console")
const {readFile, createReadStream} = require("fs")
const { type } = require("os")
const { extname } = require("path")
const { hrtime } = require("process")
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

exports.streamFile = function(req, res, filename) {
	const extension = extname(filename)
	const mimetype = mimetypes[extension].type
	const stream = createReadStream(filename)
	stream.on("error", function(err) {
		console.log(err)
		exports.sendJSON(req, res, {error: {msg: "Something went terribly wrong sir"}}, 404)
		return
	})
	res.statusCode = 200
	res.setHeader("Content-type", mimetype)
	stream.pipe(res)
}

exports.logger = function(req, res) {
	const tminus = hrtime.bigint()
	let date = new Date().toLocaleString()
	let requestBody = ` ${req.method} ${req.url}`
	res.on("finish", function() {
		const duration = hrtime.bigint() - tminus
		let status = ` ${res.statusCode} ${res.statusMessage}`
		console.log(date + requestBody + status + " process time: " + Number(duration) / 1000000 + "ms");
	})
}

exports.getData = function(req) {
	return new Promise((resolve, reject) => {
		let dataStr = ""
		req.on("data", function(chunk) {
			dataStr += chunk
		})
		req.on("end", function() {
			try {
				resolve(JSON.parse(dataStr))
			} catch (error) {
				console.log("oi");
				reject(new Error("fail"))
				
			}
		})
	})
}

exports.validateJsonSchema = function (json, schema) {
	if (Object.keys(json).length != schema.length) {
		return false
	}

	for (const property in json) {
		if (!schema.includes(property)) {
			return false
		}
	}

	return true
}

exports.validateDataType = function (values, types) {
	for (let i = 0; i < values.length; i++) {
		if(typeof values[i] != types[i]) {
			
			return false
		}
		
	}
	return true
} 


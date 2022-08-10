const { sendJSON, getData, validateJsonSchema } = require("../utilities")
const currentRoute = "/api/cat"

module.exports = {
	GET: {
		handler: function(req, res, param) {
			const response = {
				route: currentRoute,
				method: req.method,
				says: "this is a cat"
			}

			if (param) {
				response.id = param
			}
			sendJSON(req, res, response)
		}
	},
	POST: {
		handler: function(req, res, param) {
			if (param) {
				sendJSON(req, res, {route: currentRoute, method: req.method, error: "Oi no params dude"}, 405)
				return
			}
			getData(req)
			.then((input) => {
				const schema = ["Breed", "Name"]

				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Your schema is not the correct one sir"}}, 405)
					return
				}

				sendJSON(req, res, {route: currentRoute, method: req.method, says: "this is a cat", input})
			}).catch(function() {
				sendJSON(req, res, {error: {msg: "You shall send something valid sir"}}, 405)
			})
		}
	},
	PUT: {
		handler: function(req, res, param) {
			if (!param) {
				sendJSON(req, res, {error: {msg: "A parameter is quite needed here dumbass"}}, 405)
				return
			}
			
			getData(req)
			.then((input) => {
				const schema = ["Breed", "Name"] // should prob not always get both

				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Your schema is not the correct one sir"}}, 405)
					return
				}

				sendJSON(req, res, {route: currentRoute, method: req.method, says: "this is a cat", input})
			}).catch(function() {
				sendJSON(req, res, {error: {msg: "You shall send something valid sir"}}, 405)
			})
		}
	},
	DELETE: {
		handler: function(req, res, param) {
			if (!param) {
				sendJSON(req, res, {error: {msg: "A parameter is quite needed here dumbass"}}, 405)
				return
			}

			const response = {
				route: currentRoute,
				method: req.method,
				says: "The cat is gone. How could you",
				param: param
			}
			sendJSON(req, res, response)
		}
	},
}
const { sendJSON, getData, validateJsonSchema } = require("../utilities")
const currentRoute = "/api/duck"
const DuckRepo = require("../db/duck_repository")

module.exports = {
	GET: {
		handler: function(req, res, param) {
			const response = {
				route: currentRoute,
				method: req.method,
				says: "Fucking Duckididoo"
			}

			if (param) {
				try {
					DuckRepo.getById(param.split("/").pop())
					.then((data) => {
						response.duck = data
						sendJSON(req, res, response)
					})
					return
				} catch (error) {
					sendJSON(req, res, {error: "Something went wrong"}, 405)
				}
				
			}
			DuckRepo.getAll().then((data) => {
				response.ducks = data
				sendJSON(req, res, response)
			}).catch((err) => {
				sendJSON(req, res, {error: "Something went wrong"}, 404)
			})
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
				const schema = ["Color", "Name"]
				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Your schema is not the correct one sir"}}, 405)
					return
				}
				DuckRepo.create(input.Color, input.Name).then((data) => {
					sendJSON(req, res, {msg: `Duck successfully entered into the world of tables with id: ${data.id}`})
				})
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
				const schema = ["Color", "Name"] // should prob not need to get both

				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Your schema is not the correct one sir"}}, 405)
					return
				}

				const duck = {id: input.id, Color: input.Color, Name: input.Name}
				DuckRepo.update(duck).then((data) => {
					sendJSON(req, res, {msg: `Duck with id: ${input.id} has been successfully updated`})
				})
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
				says: "You shot him dead, he tried to fly away, oh oh, an awful sound, oh oh, you shot the dinner down",
				param: param
			}
			try {
				DuckRepo.delete(String(param.split('/').pop())).then((data) => {
					sendJSON(req, res, response)
				})
				return
			} catch (error) {
				sendJSON(req, res, {error: {msg: "Cat not found, maybe it ran away already"}}, 404)
			}
		}
	},
}
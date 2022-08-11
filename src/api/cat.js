const CatRepository = require("../db/cat_repository")
const { sendJSON, getData, validateJsonSchema } = require("../utilities")
const currentRoute = "/api/cat"
const CatRepo = require("../db/cat_repository")
const { db } = require("../db/dao")

module.exports = {
	GET: {
		handler: function(req, res, param) {
			const response = {
				route: currentRoute,
				method: req.method,
				says: "this is a cat"
			}

			if (param) {
				try {
					CatRepo.getById(param.split("/").pop())
					.then((data) => {
						response.cat = data
						sendJSON(req, res, response)
					})
					return
				} catch (error) {
					sendJSON(req, res, {error: "Something went wrong"}, 405)
				}
				
			}
			CatRepo.getAll().then((data) => {
				response.cats = data
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
				const schema = ["Breed", "Name"]

				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Your schema is not the correct one sir"}}, 405)
					return
				}
				CatRepo.create(input.Breed, input.Name).then((data) => {
					sendJSON(req, res, {msg: `Cat successfully entered into the world of tables with id: ${data.id}`})
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
				const schema = ["id", "Breed", "Name"] // should prob not always get both

				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Your schema is not the correct one sir"}}, 405)
					return
				}
				const cat = {id: input.id, Breed: input.Breed, Name: input.Name}
				CatRepo.update(cat).then((data) => {
					sendJSON(req, res, {msg: `Cat with id: ${input.id} has been successfully updated`})
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
				says: "The cat is gone. How could you",
				param: param
			}
			try {
				CatRepo.delete(String(param.split('/').pop())).then((data) => {
					sendJSON(req, res, response)
				})
				return
			} catch (error) {
				sendJSON(req, res, {error: {msg: "Cat not found, maybe it ran away already"}}, 404)
			}
			
		}
	},
}
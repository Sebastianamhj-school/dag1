const { sendJSON, getData, validateJsonSchema, validateDataType } = require("../utilities")
const currentRoute = "/api/person"
const PersonRepo = require("../db/person_repository")

module.exports = {
	GET: {
		handler: function(req, res, param) {
			const response = {
				route: currentRoute,
				method: req.method,
				says: "U got the people"
			}

			if (param) {
				try {
					PersonRepo.getById(param.split("/").pop())
					.then((data) => {
						response.person = data
						sendJSON(req, res, response)
					})
					return
				} catch (error) {
					sendJSON(req, res, {error: "Something went wrong"}, 404)
				}
				
			}
			PersonRepo.getAll().then((data) => {
				response.persons = data
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
				const schema = ["fullname", "email", "student", "note"]
				const types = ["string", "string", "boolean", "string"]
				const values = [input.fullname, input.email, input.student, input.note]

				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Your schema is not the correct one sir"}}, 500)
					return
				}
				if (!validateDataType(values, types)) {
					sendJSON(req, res, {error: {msg: "Your data types are wrong"}}, 500)
					return
				}
				PersonRepo.create(input.fullname, input.email, input.student, input.note).then((data) => {
					sendJSON(req, res, {msg: `Person successfully entered the world of tables at id: ${data.id}`}, 201)
				})
			}).catch(function() {
				sendJSON(req, res, {error: {msg: "You shall send something valid sir"}}, 404)
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
				const schema = ["id", "fullname", "email", "student", "note"]
				const types = ["number", "string", "string", "boolean", "string"]
				const values = [input.id, input.fullname, input.email, input.student, input.note]

				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Your schema is not the correct one sir"}}, 500)
					return
				}
				if (!validateDataType(values, types)) {
					sendJSON(req, res, {error: {msg: "Your data types are wrong"}}, 500)
					return
				}
				const person = {id: input.id, fullname: input.fullname, email: input.email, student: input.student, note: input.note}
				PersonRepo.update(person).then((data) => {
					sendJSON(req, res, {msg: `Person with id: ${input.id} has been successfully updated`})
				})
			}).catch(function() {
				sendJSON(req, res, {error: {msg: "You shall send something valid sir"}}, 404)
			})
		}
	},
	DELETE: {
		handler: function(req, res, param) {
			if (!param) {
				sendJSON(req, res, {error: {msg: "A parameter is quite needed here dumbass"}}, 404)
				return
			}

			const response = {
				route: currentRoute,
				method: req.method,
				says: "Murderer",
				param: param
			}
			try {
				PersonRepo.delete(String(param.split('/').pop())).then((data) => {
					sendJSON(req, res, response, 204)
				})
				return
			} catch (error) {
				sendJSON(req, res, {error: {msg: "He had already been killed or never existed"}}, 500)
			}
			
		}
	},
}
const { sendJSON, getData, validateJsonSchema } = require("../utilities")
const { db } = require('../database/dao')
const PersonRepo = require("../repository/personRepository")


const currentRoute = "/api/person";
const say = "Chill dude"; 


module.exports = {
	GET:{
		handler : function(req, res, param){
			const response = {
				route: currentRoute,
				method: req.method,
				says: say
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
					sendJSON(req, res, {error: "Something went wrong"}, 405)
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
	POST:{
		handler : function(req, res, param){

			const response = {
				route: currentRoute,
				method: req.method,
				says: `Post ${say}`
			}

			if (param)
			{
				response.error = "Params not allowed on POST";
				response.says = null;
				sendJSON(req,res,response, 405);
			}

			
			getData(req)
				.then((input) => {
					const schema = ["name", "email", "note", "isStudent"];
					
					if (input == "error") {	
						response.error = "Error happened";
						response.says = null;
						sendJSON(req,res, response, 405);
					}
					
					if (!validateJsonSchema(input, schema)) {
						response.error = "Schema is not a match";
						response.says = null;
						sendJSON(req, res, response, 405);
						return;
					}

					PersonRepo.create(input.name, input.email, input.note, input.isStudent).then((data) => {
						
						sendJSON(req, res, {msg: `person was created with id: ${data.id}`})
					})
				})
				.catch(function() {
					
					response.error = "Error happened";
					response.says = null;
					sendJSON(req,res, response, 405);
				})
		}
	},

	PUT:{
		handler : function(req, res, param){
			const response = {
				route: currentRoute,
				method: req.method,
				says: `PUT ${say}`
			}

			if (!param)
			{
				sendJSON(req, res, {error: {msg: "u need to enter a parameter"}}, 405)
				return

			}

			getData(req)
			.then((input) => {
				const schema = ["name", "email", "note", "isStudent"]

				if (!validateJsonSchema(input, schema)) {
					sendJSON(req, res, {error: {msg: "Schema is wrong"}}, 405)
					return
				}

				
				const personTemp = {name: input.name, email: input.email, note: input.note, isStudent: input.isStudent, id: param.split("/").pop()};
			
				PersonRepo.update(personTemp).then((data) => {
					sendJSON(req, res, {msg: `person with id: ${param.split("/").pop()} updated`})
				})
			}).catch(function() {
				sendJSON(req, res, {error: {msg: "Error happened"}}, 405)
			})

		}
	},
	DELETE:{
		handler : function(req, res, param){
			const response = {
				route: currentRoute,
				method: req.method,
				says: `Person is now gone`,
				id: param
			}

			if (!param) {
				sendJSON(req, res, {error: {msg: "A parameter is missing"}}, 405)
				return
			}

			try {
				PersonRepo.delete(String(param.split('/').pop())).then((data) => {
					sendJSON(req, res, response)
				})
				return
			} catch (error) {
				sendJSON(req, res, {error: {msg: "Person does not exist"}}, 404)
			}
		}
	},
}
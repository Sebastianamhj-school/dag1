const { sendJSON, getData, validateJsonSchema } = require("../utilities")
const currentRoute = "/api/duck";
const say = "Quack"; 


/* Needs CRUD */

module.exports = {
	GET:{
		handler : function(req, res, param){
			const response = {
				route: currentRoute,
				method: req.method,
				says: say
			}

			if (param)
			{
				response.id = param;

			}

			sendJSON(req, res, response, 200);
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
					const schema = ["Duck", "Says"];

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

					response.body = input;
					sendJSON(req, res, response, 200);

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

			if (param)
			{
				response.id = param;

			}

			sendJSON(req, res, response, 200);
		}
	},
	DELETE:{
		handler : function(req, res, param){
			const response = {
				route: currentRoute,
				method: req.method,
				says: `DELETE ${say}`
			}

			if (param)
			{
				response.id = param;

			}

			sendJSON(req, res, response, 200);
		}
	},
}
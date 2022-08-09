const { sendJSON } = require("../utilities")

module.exports = {
	GET:{
		handler : function(req, res, param){
			const response = {
				route: "/api/cat",
				method: req.method,
				says: "Miauw"
			}

			if (param)
			{
				response.id = param;

			}

			sendJSON(req, res, response, 200);
		}
	},
	POST:{
		handler : function(req, res){
			const response = {
				route: "/api/cat",
				method: req.method,
				says: "Post cat"
			}

			sendJSON(req, res, response, 200);
		}
	},
	PUT:{
		handler : function(req, res, param){
			const response = {
				route: "/api/cat",
				method: req.method,
				says: "PUT cat"
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
				route: "/api/cat",
				method: req.method,
				says: "DELETE cat"
			}

			if (param)
			{
				response.id = param;

			}

			sendJSON(req, res, response, 200);
		}
	},
}
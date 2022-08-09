const { sendJSON } = require("../utilities")

module.exports = {
	GET:{
		handler : function(req, res, param){
			const response = {
				route: "/api/duck",
				method: req.method,
				says: "Quack"
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
				route: "/api/duck",
				method: req.method,
				says: "POST Quack"
			}

			sendJSON(req, res, response, 200);
		}
	},
    PUT:{
		handler : function(req, res, param){
			const response = {
				route: "/api/duck",
				method: req.method,
				says: "PUT Quack"
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
				route: "/api/duck",
				method: req.method,
				says: "DELETE Quack"
			}

			if (param)
			{
				response.id = param;

			}

			sendJSON(req, res, response, 200);
		}
	},

}
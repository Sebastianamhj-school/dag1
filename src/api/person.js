const { sendJSON } = require("../utilities")

module.exports = {
	GET:{
		handler : function(req, res, param){
			const response = {
				route: "/api/person",
				method: req.method,
				msg: "its a dude"
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
				route: "/api/person",
				method: req.method,
				msg: "Post person"
			}

			sendJSON(req, res, response, 200);
		}
	},
	PUT:{
		handler : function(req, res, param){
			const response = {
				route: "/api/person",
				method: req.method,
				msg: "PUT person"
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
				route: "/api/person",
				method: req.method,
				msg: "DELETE person"
			}

			if (param)
			{
				response.id = param;

			}

			sendJSON(req, res, response, 200);
		}
	},
}
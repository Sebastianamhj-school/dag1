const { sendJSON } = require("../utilities")

module.exports = {
	GET: {
		handler: function(req, res, param) {
			const response = {
				route: "/api/cat",
				method: req.method,
				says: "this is a cat"
			}

			if (param) {
				response.id = param
			}
			sendJSON(req, res, response)
		}
	}
}
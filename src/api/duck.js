const { sendJSON } = require("../utilities")

module.exports = {
	GET: {
		handler: function(req, res, param) {
			const response = {
				route: "/api/duck",
				method: req.method,
				says: "Fucking Duckididoo"
			}

			if (param) {
				response.id = param
			}
			sendJSON(req, res, response)
		}
	}
}
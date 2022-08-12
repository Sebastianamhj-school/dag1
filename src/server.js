const cnf = require("./config/serverconfig.json")
const controller = require("./controller.js")
const http = require("http")
const AppDAO = require("./db/dao")
const DuckRepo = require("./db/duck_repository")
const CatRepo = require("./db/cat_repository")
const PersonRepo = require("./db/person_repository")

const hostPath = cnf.host + ":" + cnf.port

const server = http.createServer(controller);

DuckRepo.createTable()
CatRepo.createTable()
PersonRepo.createTable()

server.listen(6969);

console.log("Server executed at " + hostPath);
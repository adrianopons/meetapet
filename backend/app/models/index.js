const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.usuario = require("./usuario.model.js")(mongoose);
db.pet = require("./pet.model.js")(mongoose);
db.listaPet = require("./listaPet.model.js")(mongoose);

module.exports = db;
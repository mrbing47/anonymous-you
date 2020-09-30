const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");

function connect() {
	return mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}

function getDb() {
	return mongoose.connection;
}

module.exports = {
	getDb,
	connect,
};

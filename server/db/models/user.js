const mongoose = require("mongoose");
const Contact = require("./contact");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	picture: {
		data: "Buffer",
		contentType: String,
		// required: true,
	},
	contacts: [
		{
			type: Contact,
		},
	],
});

module.exports = mongoose.model("User", userSchema);

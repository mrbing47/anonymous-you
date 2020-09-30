const mongoose = require("mongoose");
const Message = require("./message");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
	contact: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	messages: [
		{
			type: Message,
		},
	],
});

module.exports = contactSchema;

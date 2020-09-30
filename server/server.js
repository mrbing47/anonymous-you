const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const onConnect = require("./socket/socket");
io.on("connect", onConnect);

const db = require("./db/db");

const dotenv = require("dotenv").config();
const expand = require("dotenv-expand");
expand(dotenv);

var cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Auth = require("./auth/auth");
require("./auth/config/passport");

app.use("/api/auth", Auth);

const PORT = 4769;
db.connect()
	.then(() => {
		server.listen(PORT, () => {
			console.log("Listening to PORT " + PORT);
		});
	})
	.catch((err) => {
		console.log("Unable to connect to Database.\n\n", err);
		process.exit(1);
	});

const express = require("express");
const router = express.Router();

const passport = require("passport");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const isLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.redirect("/auth");
	}
};

const wantToAuth = (req, res, next) => {
	if (req.user) {
		res.redirect("/auth/success");
	} else {
		next();
	}
};

router.use(
	session({
		name: "anonymous-you",
		secret: process.env.SECRET_KEY,
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			url: process.env.DB_URL,
		}),
	})
);

router.use(passport.initialize());
router.use(passport.session());

router
	.route("/")
	.get(wantToAuth, (req, res) => {
		res.sendFile(path.join(__dirname, "../../frontend/html/auth.html"));
	})
	.post((res, req) => {
		console.log(req.body);
		res.send("hey");
	});

router.post("/local", (req, res) => {
	console.log(req.body);
	res.send("ok");
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/failed" }), (req, res) => {
	res.redirect("http://localhost:3000/home");
});

router.get("/success", isLoggedIn, (req, res) => {
	// console.log(req.user);
	res.send(`Hello`);
});

router.get("/failed", (req, res) => {
	res.send("Auth Failed");
});

router.get("/logout", (req, res) => {
	req.user = null;
	req.logout();
	res.redirect("/");
});

module.exports = router;

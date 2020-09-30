const Users = [];
const Queue = require("../classes/Queue");
const requests = new Queue();

function onConnect(socket) {
	Users.push({
		id: socket.id,
		status: "online",
		anonymousId: "",
		requestId: "",
		connected: [],
	});

	socket.on("msg", (msg, id) => {
		socket.to(id).emit("msg", msg);
	});

	socket.on("find-user", () => {
		if (!requests.isEmpty()) {
			// Pop top 2
			let anonymous_id = requests.dequeue();

			console.log(Users);

			console.log(anonymous_id);

			let anonymous_user = Users.find((user) => user.id == anonymous_id);
			let this_user = Users.find((user) => user.id == socket.id);

			console.log(anonymous_user, "\n", this_user);

			anonymous_user.anonymousId = socket.id;
			this_user.anonymousId = anonymous_id;

			socket.emit("found", anonymous_id);
			socket.to(anonymous_id).emit("found", socket.id);
		} else {
			console.log("Added user", socket.id, "to the queue.");
			requests.enqueue(socket.id);
		}
	});

	socket.on("request", () => {
		const { err, ...index } = findBoth(socket.id);

		if (!err) {
			if (Users[index.anonymous_idx].requestId == socket.id) {
				socket.emit("accepted");
				socket.to(Users[index.anonymous_idx].id).emit("accepted");
			} else Users[index.user_idx].requestId = Users[index.user_idx].anonymousId;
		}
	});

	socket.on("leave", () => {
		const { err, ...index } = findBoth(socket.id);

		if (!err) {
			Users[index.anonymous_idx].anonymousId = "";
			socket.to(Users[index.anonymous_idx].id).emit("user-disconnect");
		}

		Users[index.user_idx].anonymousId = "";
	});

	socket.on("disconnect", () => {
		const { err, ...index } = findBoth(socket.id);
		Users[index.user_idx].status = "offline";
		if (!err) {
			Users[index.anonymous_idx].anonymousId = "";
			socket.to(Users[index.anonymous_idx].id).emit("user-disconnect");
		}

		console.log("deleting user =>", Users[index.user_idx]);
		Users.splice(index.user_idx, 1);
		requests.dequeueById(socket.id);
	});
}

function findBoth(socketid) {
	let user_idx = Users.findIndex((user) => user.id == socketid);

	if (!Users[user_idx].anonymousId) return { err: true, user_idx };

	const anonymous_idx = Users.findIndex((anony) => anony.id == Users[user_idx].anonymousId);
	if (anonymous_idx == -1) return { err: true, user_idx };

	return { err: false, user_idx, anonymous_idx };
}

module.exports = onConnect;

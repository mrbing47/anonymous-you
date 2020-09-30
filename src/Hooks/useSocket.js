import { useRef, useState, useEffect, useCallback } from "react";
import io from "socket.io-client";

export default function useSocket() {
	const [messages, setMessages] = useState([]);
	const socket = useRef({
		emit: () => {},
	});
	const [anonymous, setAnonymous] = useState("");
	const anonymousRef = useRef(anonymous);

	const addMessage = useCallback(
		(msg, type) => {
			setMessages((prev) => [...prev, { body: msg, type, time: Date.now() }]);
		},
		[setMessages]
	);

	const request = useCallback(() => {
		socket.current.emit("request");
	}, []);

	const findUser = useCallback(() => {
		if (anonymousRef) socket.current.emit("leave");
		setAnonymous("");
		anonymousRef.current = "";
		socket.current.emit("find-user");
	}, [setAnonymous]);

	const sendMsg = useCallback(
		(msg) => {
			if (!anonymousRef.current) return;

			socket.current.emit("msg", msg, anonymousRef.current);
			addMessage(msg, "send");
		},
		[addMessage]
	);

	useEffect(() => {
		socket.current = io();

		socket.current.on("connect", () => {
			console.log("Connected to server " + socket.current.id);
		});
		socket.current.on("found", (uid) => {
			console.log("FOUND =>", uid);
			anonymousRef.current = uid;
			setAnonymous(uid);
			setMessages([]);
		});
		socket.current.on("msg", (msg) => {
			console.log(msg);
			addMessage(msg, "receive");
		});
		socket.current.on("accepted", () => {
			console.log("User", anonymousRef.current, "has added you.");
		});
		socket.current.on("user-disconnect", () => {
			console.log("User", anonymousRef.current, "has left");
			addMessage(`User ${anonymousRef.current} has left`);
			setAnonymous("");
			anonymousRef.current = "";
		});

		return () => socket.current.disconnect();
	}, [addMessage]);

	return { anonymous, messages, sendMsg, findUser, request };
}

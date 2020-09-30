import React, { useState } from "react";

export default function MessageInput({ sendMsg }) {
	const [msg, setMsg] = useState("");

	const onMsgSubmit = () => {
		sendMsg(msg);
		setMsg("");
	};

	return (
		<div id="msg-input-container">
			<input
				type="text"
				value={msg}
				name="message"
				id="msg-input"
				placeholder="Enter a Message..."
				onChange={(e) => setMsg(e.target.value)}
				onKeyDown={(e) => (e.key === "Enter" ? onMsgSubmit() : "")}
			/>
			<button id="msg-btn" onClick={onMsgSubmit}>
				Send
			</button>
		</div>
	);
}

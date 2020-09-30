import React from "react";
import MessageItem from "./MessageItem";

export default function MessageContainer(props) {
	return (
		<div id="msg-container">
			{props.messages.map((msg, i) => (
				<MessageItem msg={msg.body} type={msg.type} key={i} />
			))}
		</div>
	);
}

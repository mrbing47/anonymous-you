import React from "react";
import useSocket from "../Hooks/useSocket";
import TopBar from "./TopBar";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";

import "./css/home.css";
import "./css/global.css";

export default function Home() {
	const { anonymous, messages, sendMsg, findUser, request } = useSocket();

	return (
		<div id="home">
			<TopBar uid={anonymous} findNewUser={findUser} requestUser={request} />
			<MessageContainer messages={messages} />
			<MessageInput sendMsg={sendMsg} />
		</div>
	);
}

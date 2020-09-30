import React from "react";

export default function TopBar(props) {
	return (
		<div id="top-bar">
			<div id="anonymous-uid">{props.uid}</div>
			<div id="top-bar-btn">
				<button id="btn-add-friend" onClick={() => props.requestUser()}>
					Add Friend
				</button>
				<button id="btn-new-friend" onClick={() => props.findNewUser()}>
					Find a New Person
				</button>
			</div>
		</div>
	);
}

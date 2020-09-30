import React, { useRef, useEffect } from "react";

export default React.memo(function MessageItem(props) {
	const render = useRef(0);
	useEffect(() => {
		console.log(render.current++, props.msg);
	});

	const timeElement = <div className="msg-time">{props.time}</div>;
	return (
		<div className={`${props.type} msg`}>
			<div className="msg-body">{props.msg}</div>
			{props.type === "general" ? timeElement : ""}
		</div>
	);
});

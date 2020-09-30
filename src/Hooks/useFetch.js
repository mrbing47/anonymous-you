import { useState, useEffect } from "react";

export default function useFetch(url) {
	const [state, setState] = useState({
		data: null,
		loading: false,
	});

	useEffect(() => {
		setState((state) => ({ data: state.data, loading: true }));

		fetch(url)
			.then((res) => res.text())
			.then((data) => {
				setState({
					data: data,
					loading: false,
				});
			})
			.catch((err) => console.error(err));
	}, [url]);

	return state;
}

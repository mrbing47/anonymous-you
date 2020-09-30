import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/home" component={Home} />
				{/* <Route path="/" component={NoMatch} /> */}
			</Switch>
		</Router>
	);
}

export default App;

/** @format */
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from "react-router-dom";
import "./index.sass";
import { App } from "../App/App";

render(
	<Router>
		<Switch>
			<Route path="/" exact>
				<App />
			</Route>
		</Switch>
	</Router>,
	document.getElementById("root")
);

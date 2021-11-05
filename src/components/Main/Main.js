import React from "react";
import { Routes, Route } from "react-router-dom";

// Components //
import LoginPage from "../../pages/LoginPage";

// Style //
import "../../style/Main.css";

const Main = () => {
	return (
		<main>
			<Routes>
				<Route exact path="/" component={LoginPage} />
			</Routes>
		</main>
	);
};

export default Main;

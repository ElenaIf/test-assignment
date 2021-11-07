import React from "react";
import { Routes, Route } from "react-router-dom";

// Context //
import { useAuth } from "../../contexts/post-context";

// Components //
import LoginPage from "../../pages/LoginPage";
import UsersMainPage from "../../pages/UsersMainPage";

// Style //
import "../../style/Main.css";

const Main = () => {
	const { token } = useAuth();
	return (
		<main>
			<Routes>
				{/* {token !== null ? ( */}
				<Route path="/" element={<UsersMainPage />} />
				{/* ) : ( */}
				{/* <Route end={true} path="/" element={<LoginPage />} /> */}
				{/* )} */}
			</Routes>
		</main>
	);
};

export default Main;

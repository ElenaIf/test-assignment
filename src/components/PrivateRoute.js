import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/post-context";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { token } = useAuth();
	return (
		<Route
			{...rest}
			render={(props) => {
				return token ? <Component {...props} /> : <Redirect to="/" end={true} />;
			}}
		></Route>
	);
};

export default PrivateRoute;

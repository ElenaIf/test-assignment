import React, { useContext, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);

	const getToken = (email, name) => {
		let bodyFormData = new FormData();
		bodyFormData.append("client_id", process.env.REACT_APP_CLIENT_ID);
		bodyFormData.append("email", email);
		bodyFormData.append("name", name);
		try {
			axios({
				method: "post",
				url: "https://api.supermetrics.com/assignment/register",
				data: bodyFormData,
				headers: { "Content-Type": "multipart/form-data" },
			}).then((resp) => {
				setToken(resp.data.data.sl_token);
				console.log(token);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const value = {
		getToken,
		token,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

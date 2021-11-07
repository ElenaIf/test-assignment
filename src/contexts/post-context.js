import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null); //to save here the token we will get
	const [posts, setPosts] = useState(null);

	const [uniqueNames, setUniqueNames] = useState([]);
	const [uniqueIds, setUniqueIds] = useState([]);

	//to get the token (POST method)
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
				console.log("hello");
				console.log(resp.data.data.sl_token);
				fetchPosts(resp.data.data.sl_token);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const fetchPosts = (myToken) => {
		axios
			.get("https://api.supermetrics.com/assignment/posts", {
				params: {
					sl_token: myToken,
					page: 1,
				},
			})
			.then((response) => {
				setPosts(response.data.data.posts);
			});
	};

	const getUniqueUsers = (allPosts) => {
		let allUsers = [];
		let allNames = [];

		allPosts.forEach((post) => {
			if (post.from_id) {
				if (!allUsers.includes(post.from_id)) {
					allUsers.push(post.from_id);
				}
			}
		});

		allUsers.forEach((user) => {
			allPosts.forEach((post) => {
				if (post.from_id === user && !allNames.includes(post.from_name)) {
					allNames.push({ [post.from_id]: [post.from_name] });
				}
			});
		});
		setUniqueIds(allUsers);
		setUniqueNames(allNames);
		console.log(allNames);
		console.log(allUsers);
	};

	const value = {
		getToken,
		token,
		fetchPosts,
		posts,
		uniqueNames,
		uniqueIds,
		getUniqueUsers,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

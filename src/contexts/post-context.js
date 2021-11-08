import React, { useContext, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("s_token")); //to save here the token we will get
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
				localStorage.setItem("s_token", resp.data.data.sl_token);
				fetchPosts(resp.data.data.sl_token);
			});
		} catch (err) {
			alert(err);
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
				window.setTimeout(removeToken, 3600000);
			})
			.catch((error) => {
				if (error.message === "Request failed with status code 500") {
					removeToken();
				}
			});
	};

	const removeToken = () => {
		localStorage.removeItem("s_token");
		alert("Token has expired!");
		document.location.reload();
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

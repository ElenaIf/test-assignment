import React, { useContext, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

// making a hook to use in other components //
export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("s_token")); //to save here the token we will get
	const [posts, setPosts] = useState(null); //all the posts that we fetch

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

	//to fetch all the posts after we got the token
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

	//delete token from the local storage
	const removeToken = () => {
		localStorage.removeItem("s_token");
		alert("Token has expired!");
		document.location.reload();
	};

	//making an array of unique users ids
	let uniqueUsers = [];
	if (posts) {
		uniqueUsers = [...new Set(posts.map((post) => post.from_id))];
	}

	//making an array of unique users names
	let uniqueNames = [];
	if (posts) {
		uniqueUsers.forEach((user) => {
			posts.forEach((post) => {
				if (post.from_id === user && !uniqueNames.includes(post.from_name)) {
					uniqueNames.push(post.from_name);
				}
			});
		});
	}

	//making an array of number of posts each user made
	let numberOfPosts = [];
	if (posts) {
		uniqueUsers.forEach((user) => {
			let count = 0;
			posts.forEach((post) => {
				if (post.from_id === user) {
					count = count + 1;
				}
			});
			numberOfPosts.push(count);
		});
	}

	//now we combine all three arrays (ids, user names and post counts) into one array of objects
	const uniqueIdsAndUsersArray = uniqueUsers.map((x, i) => {
		return { user_id: x, user_name: uniqueNames[i], posts_count: numberOfPosts[i] };
	});

	const value = {
		getToken,
		token,
		fetchPosts,
		posts,
		uniqueIdsAndUsersArray,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

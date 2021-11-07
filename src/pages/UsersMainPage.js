import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

// Components //
import Message from "../components/Message/Message";

// Context //
import { useAuth } from "../contexts/post-context";

// Style //
import "../style/UsersMainPage.css";

const UsersMainPage = () => {
	const { posts, fetchPosts } = useAuth();
	const [chosenUser, setChosenUser] = useState(null);

	//This is for testing//
	useEffect(() => {
		fetchPosts("smslt_5d3303505d_945d9236be");
	}, []);
	//

	let uniqueUsers = [];
	if (posts) {
		uniqueUsers = [...new Set(posts.map((post) => post.from_id))];
	}

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

	const uniqueIdsAndUsersArray = uniqueUsers.map((x, i) => {
		return { user_id: x, user_name: uniqueNames[i], posts_count: numberOfPosts[i] };
	});

	console.log("Here are the users", uniqueUsers);
	console.log("Here are the names", uniqueNames);
	console.log("Here are the counts", numberOfPosts);
	console.log("Here are the names and IDs", uniqueIdsAndUsersArray);
	console.log(posts);

	return (
		<section className="posts-container">
			<div className="posts-left">
				<form className="left-search">
					<input type="text" placeholder="search" />
				</form>

				{posts !== null && (
					<div className="user-list">
						{uniqueIdsAndUsersArray.map((element) => {
							return (
								<div
									className="user-name"
									onClick={() => {
										setChosenUser(element.user_id);
										console.log("chosen user is", chosenUser);
									}}
								>
									{element.user_name}
									<span> Number of posts: {element.posts_count}</span>
								</div>
							);
						})}
					</div>
				)}
			</div>
			<div className="posts-right">
				<div className="filter-and-search">
					<div className="arrows">
						<div className="arrow">▼</div>
						<div className="arrow">▲</div>
					</div>
					<form>
						<input type="text" placeholder="search" />
					</form>
				</div>
				{posts !== null && (
					<div className="post-list">
						{posts
							.filter((element) => {
								if (chosenUser !== null) {
									return element.from_id === chosenUser;
								} else {
									return posts;
								}
							})
							.map((post) => {
								return <div className="message">{post.message}</div>;
							})}
					</div>
				)}
			</div>
		</section>
	);
};

export default UsersMainPage;

import React, { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import Moment from "react-moment";
import "moment-timezone";

// Components //
//import Message from "../components/Message/Message";

// Context //
import { useAuth } from "../contexts/post-context";

// Style //
import "../style/UsersMainPage.css";

const UsersMainPage = () => {
	const { posts, fetchPosts, token } = useAuth();
	const [chosenUser, setChosenUser] = useState(null);
	const userSearchRef = useRef();
	const postSearchRef = useRef();
	const [userSearchInput, setUserSearchInput] = useState(null);
	const [postSearchInput, setPostSearchInput] = useState(null);
	const [sortOldFirst, setSortOldFirst] = useState(false);

	useEffect(() => {
		fetchPosts(token);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	return (
		<section className="posts-container">
			<div className="posts-left">
				<form
					className="left-search"
					onSubmit={(event) => {
						event.preventDefault();
					}}
				>
					<input
						type="text"
						placeholder="search users"
						ref={userSearchRef}
						onChange={() => {
							setUserSearchInput(userSearchRef.current.value);
						}}
					/>
				</form>

				{posts !== null && (
					<div className="user-list">
						{uniqueIdsAndUsersArray
							.filter((element) => {
								if (userSearchInput !== null) {
									return element.user_name
										.toLocaleLowerCase()
										.includes(userSearchInput.toLocaleLowerCase());
								} else {
									return uniqueIdsAndUsersArray;
								}
							})
							.sort((x, y) => {
								if (x.user_name < y.user_name) {
									return -1;
								}
								if (x.user_name > y.user_id) {
									return 1;
								}
								return 0;
							})
							.map((element) => {
								return (
									<div
										key={element.user_id}
										className="user-name"
										onClick={() => {
											setChosenUser(element.user_id);
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
						<div
							className="arrow"
							onClick={() => {
								setSortOldFirst(true);
							}}
						>
							▼
						</div>
						<div
							className="arrow"
							onClick={() => {
								setSortOldFirst(false);
							}}
						>
							▲
						</div>
					</div>
					<form
						onSubmit={(event) => {
							event.preventDefault();
						}}
					>
						<input
							type="text"
							placeholder="search posts"
							ref={postSearchRef}
							onChange={() => {
								setPostSearchInput(postSearchRef.current.value);
							}}
						/>
					</form>
				</div>
				{posts !== null && (
					<div className="post-list">
						{posts
							.sort(function (a, b) {
								var c = new Date(a.created_time);
								var d = new Date(b.created_time);
								if (sortOldFirst) {
									return d - c;
								} else {
									return c - d;
								}
							})
							.filter((element) => {
								if (postSearchInput !== null) {
									return element.message
										.toLocaleLowerCase()
										.includes(postSearchInput.toLocaleLowerCase());
								} else {
									return posts;
								}
							})
							.filter((element) => {
								if (chosenUser !== null) {
									return element.from_id === chosenUser;
								} else {
									return posts;
								}
							})
							.map((post) => {
								return (
									<div key={post.id} className="message">
										<div>
											{" "}
											<Moment date={post.created_time} format="MMMM D, YYYY HH:MM:SS" />
										</div>
										{post.message}
										<div>Sent by: {post.from_name}</div>
									</div>
								);
							})}
					</div>
				)}
			</div>
		</section>
	);
};

export default UsersMainPage;

import React, { useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";

// Components //
import UsersList from "../components/UsersList/UsersList";
import MessageList from "../components/Message/MessageList";

// Context //
import { useAuth } from "../contexts/post-context";

// Style //
import "../style/UsersMainPage.css";

const UsersMainPage = () => {
	const { posts, fetchPosts, token } = useAuth(); //hook from context
	const [chosenUser, setChosenUser] = useState(null); //which user was clicked

	//for searching users and posts
	const [userSearchInput, setUserSearchInput] = useState(null);
	const [postSearchInput, setPostSearchInput] = useState(null);

	const [sortOldFirst, setSortOldFirst] = useState(false); //for sorting posts by date

	//refs for inputs
	const userSearchRef = useRef();
	const postSearchRef = useRef();

	useEffect(() => {
		fetchPosts(token);
		//this is to get rid of the error message about missing dependency in useEffect
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className="posts-container">
			<div className="posts-left">
				<form
					className="left-search"
					onSubmit={(event) => {
						event.preventDefault(); //so the page does not reload
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
					<UsersList userSearchInput={userSearchInput} setChosenUser={setChosenUser} />
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
					<MessageList
						sortOldFirst={sortOldFirst}
						postSearchInput={postSearchInput}
						chosenUser={chosenUser}
					/>
				)}
			</div>
		</section>
	);
};

export default UsersMainPage;

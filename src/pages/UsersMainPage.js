import React from "react";
import { useAuth } from "../contexts/post-context";

const UsersMainPage = () => {
	const { fetchPosts, token } = useAuth();

	return (
		<div>
			You are logged in!
			<form
				onSubmit={(event) => {
					event.preventDefault();
					fetchPosts(token);
				}}
			>
				<button>Press me</button>
			</form>
		</div>
	);
};

export default UsersMainPage;

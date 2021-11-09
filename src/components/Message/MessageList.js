import React from "react";

// Moment is for parcing the date
import Moment from "react-moment";
import "moment-timezone";

// Context //
import { useAuth } from "../../contexts/post-context";

const MessageList = ({ sortOldFirst, postSearchInput, chosenUser }) => {
	const { posts } = useAuth();
	return (
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
	);
};

export default MessageList;

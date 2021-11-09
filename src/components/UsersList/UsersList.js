import React from "react";

// Context //
import { useAuth } from "../../contexts/post-context";

// Style //
import "../../style/UsersList.css";

const UsersList = ({ userSearchInput, setChosenUser }) => {
	const { uniqueIdsAndUsersArray } = useAuth();
	return (
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
							<div className="count-circle">{element.posts_count}</div>
						</div>
					);
				})}
		</div>
	);
};

export default UsersList;

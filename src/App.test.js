const posts = require("./test_data.json"); //exporting some test data

test("To check if the Jest tests work. Should return true", () => {
	expect(true).toBeTruthy();
});

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

describe("1 - check if I get arrays with unique values", () => {
	test("Get an array with only unique ID's of users", () => {
		const result = ["user_8", "user_17", "user_0"];
		expect(uniqueUsers).toEqual(result);
	});

	test("Get an array with only unique names of users", () => {
		const result = ["Maxie Marceau", "Mandie Nagao", "Lael Vassel"];
		expect(uniqueNames).toEqual(result);
	});
});

// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
// 	render(<App />);
// 	const linkElement = screen.getByText(/Login/i);
// 	expect(linkElement).toBeInTheDocument();
// });

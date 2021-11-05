import React, { useRef } from "react";
// import axios from "axios";

import { useAuth } from "../../contexts/post-context";

// Style //
import "../../style/LoginForm.css";

// const getToken = (email, name) => {
// 	let bodyFormData = new FormData();
// 	bodyFormData.append("client_id", process.env.REACT_APP_CLIENT_ID);
// 	bodyFormData.append("email", email);
// 	bodyFormData.append("name", name);
// 	try {
// 		axios({
// 			method: "post",
// 			url: "https://api.supermetrics.com/assignment/register",
// 			data: bodyFormData,
// 			headers: { "Content-Type": "multipart/form-data" },
// 		}).then((resp) => {
// 			console.log(resp.data.data.sl_token);
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

const LoginForm = () => {
	const emailRef = useRef();
	const nameRef = useRef();
	const { getToken } = useAuth();

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				getToken(emailRef.current.value, nameRef.current.value);
			}}
		>
			<h1>Login</h1>
			<div className="form-group">
				<label htmlFor="user_email">Email</label>
				<input type="text" name="user_email" ref={emailRef} />
			</div>
			<div className="form-group">
				<label htmlFor="user_name">Name</label>
				<input type="text" name="user_name" ref={nameRef} />
			</div>
			<button type="submit">GO</button>
		</form>
	);
};

export default LoginForm;

import React, { useRef } from "react";

import { useAuth } from "../../contexts/post-context";

// Style //
import "../../style/LoginForm.css";

const LoginForm = () => {
	const emailRef = useRef();
	const nameRef = useRef();
	const { getToken } = useAuth();

	return (
		<form
			className="login-form"
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

// Libraries //
import React from "react";
import ReactDOM from "react-dom";

// Context //
import { AuthProvider } from "./contexts/post-context";

// Style //
import "./style/index.css";

// Components //
import App from "./App";

// Tests //
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<AuthProvider>
		<App />
	</AuthProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

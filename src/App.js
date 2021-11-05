import { BrowserRouter as Router } from "react-router-dom";

// Components //
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

// Style //
import "./style/App.css";

function App() {
	return (
		<Router>
			<div className="container">
				<Header />

				<Main />

				<Footer />
			</div>
		</Router>
	);
}

export default App;

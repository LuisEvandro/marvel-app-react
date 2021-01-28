import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "../src/css/global.css";
import Routes from "./routes";
import Header from "./components/header";
import Footer from "./components/footer";

export default function App() {
	
	return (
		<Router>
			<Header />
			<Routes />
			<Footer />
		</Router>
	);
}
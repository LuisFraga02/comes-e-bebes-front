import { useState } from "react";
import { Route, Routes } from "react-router-dom";
//fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//pages
import Login from "./components/login/login";
import MainPage from "./components/main/mainPage";
import Navbar from "./components/navBar/NavBar";
import CreateAccount from "./components/createAccount/createAccount";
//pages
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/mainPage" element={<MainPage />} />
				<Route path="/createAccount" element={<CreateAccount />} />
			</Routes>
		</>
	);
}

export default App;

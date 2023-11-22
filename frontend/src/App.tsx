import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import MainPage from "./components/main/mainPage";
import Navbar from "./components/navBar/NavBar";
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/mainPage" element={<MainPage />} />
			</Routes>
		</>
	);
}

export default App;

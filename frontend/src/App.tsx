import { useState } from "react";
import { Route, Routes } from "react-router-dom";
//fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//pages
import Login from "./components/login/login";
import MainPage from "./components/mainPage/mainPage";
import CreateAccount from "./components/createAccount/createAccount";
import EditAccount from "./components/editAccount/editAccount";
import Menu from "./components/menu/menu";
import Purchase from "./components/purchase/purchase";
//pages
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/mainPage" element={<MainPage />} />
				<Route path="/createAccount" element={<CreateAccount />} />
				<Route path="/editAccount" element={<EditAccount />} />
				<Route path="/menu" element={<Menu />} />
				<Route path="/purchase" element={<Purchase />} />
			</Routes>
		</>
	);
}

export default App;

import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Navbar = () => {
	const details = document.getElementById("details") as HTMLDetailsElement;
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = React.useState(false);
	const handleOpen = () => {
		setIsOpen(!isOpen);
	};
	//add a event listener to the dropdown
	if (localStorage.getItem("token") != null) {
		return <div></div>;
	} else {
		return (
			<div className="NavBody row">
				<div className="col-6">
					<div>Comes & bebes</div>
				</div>
				<div className="col-6">
					<details id="details" className="dropdown">
						<summary>Dropdown</summary>
						<div className="dropdown-content">
							<div onClick={() => navigate("/")}>Home</div>
							<div onClick={() => navigate("/login")}>Login</div>
							<div onClick={() => navigate("/register")}>
								Register
							</div>
						</div>
					</details>
				</div>
			</div>
		);
	}
};
export default Navbar;

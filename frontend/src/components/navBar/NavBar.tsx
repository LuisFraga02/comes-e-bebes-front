import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Navbar = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = React.useState(false);
	const handleOpen = () => {
		setIsOpen(!isOpen);
	};
	const userName = localStorage.getItem("userName");
	if (localStorage.getItem("token") == "nao") {
		return <div></div>;
	} else {
		return (
			<>
				<div className="NavBody row justify-content-evenly pr">
					<div className="col my-auto mx-4">
						<div>Comes & bebes</div>
					</div>
					<div className="col row d-flex justify-content-end my-auto text-end">
						<h4 className="col my-auto text-end">{userName}</h4>
						<div className="col-1">
							<img src={"https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + userName} alt="avatar" className="avatarSize rounded" />
						</div>
					</div>
				</div>
			</>
		);
	}
};
export default Navbar;

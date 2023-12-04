import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Navbar = () => {
	const navigate = useNavigate();
	const userName = localStorage.getItem("userName");
	const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

	if (localStorage.getItem("token") == "nao") {
		return <div></div>;
	} else {
		return (
			<>
				<div className="NavBody row pr">
					<h2 className="col my-auto fonteBonita">
						<b>Comes & Bebes</b>
					</h2>
					<div className="col-2 row d-flex justify-content-end my-auto">
						<h4 className="col my-auto text-end">{userInfo.username}</h4>
						<div className="col-1">
							<img
								onClick={() => {
									// alert(JSON.stringify(userInfo));
									navigate("/editAccount");
									// console.log(userInfo);
								}}
								src={"https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + userInfo.username}
								alt="avatar"
								className="avatarSize rounded"
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
};
export default Navbar;

import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
const Navbar = () => {
	const navigate = useNavigate();
	const userName = localStorage.getItem("userName");
	const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

	return (
		<>
			<div className="NavBody row pr">
				<h2 className="col my-auto fonteBonita" onClick={() => navigate("/mainPage")}>
					<b>Comes & Bebes</b>
				</h2>
				<h4
					className="col my-auto text-end hoverScale"
					hidden={userInfo.userTypeId === 1 ? true : false}
					onClick={() => {
						navigate("/menu");
					}}
				>
					<MdOutlineRestaurantMenu />
					cardapio
				</h4>
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
};
export default Navbar;

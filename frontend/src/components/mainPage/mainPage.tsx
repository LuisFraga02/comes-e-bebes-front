import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./mainPage.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";

import Navbar from "../navBar/NavBar";
import { set } from "date-fns";

function mainPage() {
	const navigate = useNavigate();

	const userInfo = localStorage.getItem("userInfo");
	const token = localStorage.getItem("token");
	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
		getRestaurant();
	}, []);

	//remove repeated items from the itemList

	const [restaurantList, setRestaurantList] = useState<any[]>([]);
	const getRestaurant = async () => {
		// send the token through the header
		await axios
			.get("http://localhost:8001/comes-bebes/restaurant", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setRestaurantList(response.data.additionalInfo);
				console.log(response.data);
				//make itemList
				let auxarr = [];
				for (let i = 0; i < response.data.additionalInfo.length; i++) {
					for (let j = 0; j < response.data.additionalInfo[i].itemList.length; j++) {
						auxarr.push(response.data.additionalInfo[i].itemList[j]);
					}
				}
				setItemList(auxarr);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const [itemList, setItemList] = useState<any[]>([]);
	return (
		<>
			<Navbar />
			<br />
			<br />
			<div className="container " id="items">
				<h1 className="p-2 m-2">pratos</h1>
				<div className="row">
					{itemList.map((item, index) => (
						<div key={index} className="col-2" title={item.description}>
							<div className="card cardHeight">
								<img src={"data:image/png;base64," + item.itemImage} alt="item" className="card-img-top border p-4 border restImage " />
								<div className="card-body text-center">
									<div className="card-subtitle">id: {item.itemId}</div>
									<div className="card-title ">{item.itemName}</div>
								</div>
								<div className="row mx-2">
									<div className="col my-auto">
										<b>R$ {item.price}</b>
									</div>
									<div className="text-end col">
										<MdOutlineAddShoppingCart size={30} className="bg-success my-2 p-1 rounded" />
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<hr />
			<div className="container my-5 " id="restaurantes">
				<h1 className="p-2 m-2">restaurantes</h1>
				<div className="row my-auto">
					{restaurantList.map((item, index) => (
						<div key={index} className="col-2">
							<div className="card cardHeight">
								<img src={item.restaurantImage} alt="restaurant" className="card-img-top border p-2 restImage " />
								<div className="card-body text-center">
									<div className="card-subtitle border rounded">id: {item.restaurantId}</div>
									<div className="card-title border rounded">{item.restaurantName}</div>
									<div className="card-text border rounded">{item.address}</div>
									<div className="card-text border rounded">{item.workTime}</div>
									<div className="card-text border rounded">
										<b>{item.itemList.length}</b> itens no cardapio
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
}
export default mainPage;

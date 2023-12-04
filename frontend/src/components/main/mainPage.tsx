import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./mainPage.css";

import Navbar from "../navBar/NavBar";

function mainPage() {
	const navigate = useNavigate();

	const userInfo = localStorage.getItem("userInfo");
	const token = localStorage.getItem("token");
	useEffect(() => {
		if (token === "nao") {
			navigate("/");
		}
		getRestaurant();
	}, []);

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
				//console.log(response.data);
				console.log(restaurantList);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Navbar />
			<br />
			<br />
			<br />
			<div className="container my-5 " id="restaurantes">
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
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<hr />
			<div className="container" id="items"></div>
		</>
	);
}
export default mainPage;

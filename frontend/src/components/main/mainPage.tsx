import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./mainPage.css";

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
			<br />
			<br />
			<br />
			<div className="container my-3">
				<div className="row my-auto">
					{restaurantList.map((item, index) => (
						<div key={index} className="col-2 ">
							<div className="card">
								<img src={item.restaurantImage} alt="restaurant" className="card-img-top border " />
								<div className="card-body">
									<div className="card-title">nome: {item.restaurantName}</div>
									<div className="card-subtitle">id: {item.restaurantId}</div>
									<div className="card-text">endereço: {item.address}</div>
									<div className="card-text">aberto: {item.workTime}</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
export default mainPage;

import axios from "axios";
import { set } from "date-fns";
import React from "react";
import Swal from "sweetalert2";
function purchase() {
	const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
	const item = JSON.parse(localStorage.getItem("itemwow") || "{}");
	const [quantidade, setQuantidade] = React.useState(1);

	const getRestaurant = async () => {
		await axios
			.get(`http://localhost:8001/comes-bebes/restaurant/by-id?restaurantId=${item.restaurantId}`, {
				headers: {
					Authorization: `Bearer ${userInfo.jwtToken}`,
				},
			})
			.then((response) => {
				//console.log(response.data);
				setRestaurant(response.data.additionalInfo);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	React.useEffect(() => {
		getRestaurant();
	}, []);
	const [restaurant, setRestaurant] = React.useState({});
	const [total, setTotal] = React.useState(item.price);

	const finalPurchase = async () => {
		//simulating a purchase
		Swal.fire({
			title: "comprando",
			text: "total da compra: R$ " + total,
			icon: "info",
			confirmButtonText: "pagar",
		}).then(() => {
			// //create the object
			// setCompra({
			// 	description: "Deixar com o porteiro",
			// 	clientId: userInfo.userId,
			// 	itemAcquisition: [
			// 		{
			// 			description: "sem presunto",
			// 			item: {
			// 				price: item.price,
			// 				itemId: item.itemId,
			// 				additionalItemList: [
			// 					{
			// 						additionalItemId: 1,
			// 					},
			// 				],
			// 			},
			// 		},
			// 	],
			// });
			//backendProcess();
			//get the item
			Swal.fire({
				title: "compra finalizada",
				text: "obrigado por comprar conosco seu pedido chegará em breve",
				icon: "success",
				confirmButtonText: "ok",
			}).then(() => {
				window.location.href = "/mainPage";
			});
		});
	};
	// post example object
	//{
	//     "description": "Deixar com o porteiro",
	//     "clientId" : 2,
	//     "itemAcquisition":[{
	//         "description": "sem presunto",
	//         "item":{
	//             "price":25,
	//             "itemId":1,
	//             "additionalItemList":[{
	//                 "additionalItemId": 1
	//             }]

	//         }
	//     }]
	// }
	// const [compra, setCompra] = React.useState({});
	// const backendProcess = async () => {
	// 	await axios
	// 		.post("http://localhost:8001/comes-bebes/acquisition", compra, {
	// 			headers: {
	// 				Authorization: `Bearer ${userInfo.jwtToken}`,
	// 			},
	// 		})
	// 		.then((response) => {
	// 			console.log(response.data);
	// 		});
	// };
	// const detalhesCompra = () => {
	// 	setCompra({
	// 		description: compra,
	// 		clientId: userInfo.userId,
	// 		itemAcquisition: [
	// 			{
	// 				description: "sem presunto",
	// 				item: {
	// 					price: 25,
	// 					itemId: 1,
	// 					additionalItemList: [
	// 						{
	// 							additionalItemId: 1,
	// 						},
	// 					],
	// 				},
	// 			},
	// 		],
	// 	});
	// };

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col">
						<h1>comprar item</h1>
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col my-auto text-center">
										<img src={"data:image/png;base64," + item.itemImage} alt="item" className="border p-2 img " />
									</div>
									<div className="col my-auto ">
										<div>
											<h2 className="row">{item.itemName}</h2>
											<h4 className="row">{item.description}</h4>
										</div>
										<h4>preco unitario: R$ {item.price}</h4>
										<h4>restaurante: {restaurant.restaurantName}</h4>
										<h4>id do restaurante: {item.restaurantId}</h4>
										<h4>id do item: {item.itemId}</h4>
										<textarea className="form-control" placeholder="observacoes" />
										<div className="row">
											<div className="col">
												<h4 className="col-11">quantidade</h4>
												<div className="col-4">
													<input
														type="number"
														className="form-control col-1 border border-dark"
														min="1"
														value={quantidade}
														onChange={(e) => {
															setTotal(Number(e.target.value) * item.price);
															setQuantidade(Number(e.target.value));
														}}
													/>
												</div>
											</div>
										</div>
										<div className="row my-5">
											<div className="col mx-3">
												<h4>total da compra: R$ {total}</h4>
												<h5>quantidade de itens :{quantidade}</h5>
											</div>
											<div className="col-4">
												<button className="btn btn-lg btn-success" type="button" onClick={finalPurchase}>
													finalizar compra
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default purchase;

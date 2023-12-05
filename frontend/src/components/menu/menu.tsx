import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import "./menu.css";

import Navbar from "../navBar/NavBar";
import { da } from "date-fns/locale";

function menu() {
	const navigate = useNavigate();

	const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
	const token = localStorage.getItem("token");

	const [nomeDoProduto, setNomeDoProduto] = useState("");
	const [descricaoDoProduto, setDescricaoDoProduto] = useState("");
	const [precoDoProduto, setPrecoDoProduto] = useState(0);
	const [imagemDoProduto, setImagemDoProduto] = useState(
		"data:image/png;base64,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"
	);
	const [additionalItemList, setAdditionalItemList] = useState([
		{
			additionalItemName: "",
			price: 0,
			description: "",
			status: true,
		},
	]);

	const cadastrarProduto = () => {
		const data = {
			itemName: nomeDoProduto,
			description: descricaoDoProduto,
			price: precoDoProduto,
			itemImage: imagemDoProduto.split(",")[1],
			restaurantId: userInfo?.restaurantId,
			status: true,
			additionalItemList: additionalItemList,
		};
		console.log(data);
		axios
			.post("http://localhost:8001/comes-bebes/restaurant/item", data, {
				headers: {
					Authorization: "Bearer " + userInfo?.jwtToken,
				},
			})
			.then((response) => {
				console.log(response);
				navigate("/mainPage");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<Navbar />
			<br />
			<br />
			<br />
			<div id="cadastro_de_item">
				<div className="container ">
					<div className="col-10 pt-5 mx-auto">
						<div className="row">
							<div className="form-group my-4 col-6">
								<label htmlFor="username" className="m-2">
									Nome do Produto
								</label>
								<input
									type="text"
									value={nomeDoProduto}
									onChange={(e) => {
										setNomeDoProduto(e.target.value);
									}}
									className="form-control p-3"
									id="username"
									placeholder="Nome do Produto"
									required
								/>
							</div>
							<div className="form-group my-4 col-6">
								<label htmlFor="username" className="m-2">
									Preço do Produto (R$)
								</label>
								<input
									type="number"
									step="0.50"
									value={precoDoProduto}
									onChange={(e) => {
										setPrecoDoProduto(e.target.value);
									}}
									className="form-control p-3"
									id="username"
									placeholder="Preço do Produto"
									required
								/>
							</div>
							<div className="form-group my-2 col">
								<label htmlFor="username" className="m-2">
									Descrição do Produto
								</label>
								<textarea
									value={descricaoDoProduto}
									onChange={(e) => {
										setDescricaoDoProduto(e.target.value);
									}}
									className="form-control p-3"
									id="username"
									placeholder="Descrição do Produto"
									required
								/>
							</div>

							<div className="row">
								{/* imagem */}
								<div className="col-8">
									<div className="form-group my-4">
										<label htmlFor="userImage" className="m-2">
											Imagem
										</label>
										<input
											type="file"
											className="form-control p-3"
											id="userImage"
											placeholder="Imagem"
											required
											onChange={(e) => {
												//convert to base64
												if (e.target.files && e.target.files[0]) {
													const reader = new FileReader();
													reader.readAsDataURL(e.target.files[0]);
													reader.onload = () => {
														setImagemDoProduto(reader.result as string);
													};
												}
											}}
										/>
									</div>
								</div>
								<div className="col m-auto text-center ">
									<img src={imagemDoProduto} alt="imagem" className="p-2 m-2 border border-5 rounded-3 tamanho_da_imagem" />
								</div>
							</div>
							<div id="adiconais" className="border mt-3">
								<div className="row">
									<div className="col-12">
										<h3>Adicionais</h3>
									</div>
									<div className="col-12">
										<button
											type="button"
											className="btn btn-primary btn-lg my-4"
											onClick={() => {
												setAdditionalItemList([
													...additionalItemList,
													{
														additionalItemName: "",
														price: "",
														description: "",
														status: true,
													},
												]);
											}}
										>
											Adicionar Adicional
										</button>
									</div>
									{additionalItemList.map((item, index) => {
										return (
											<div className="col-12 border" key={index}>
												<div className="row p-2">
													<h1 className="col">Adicional {index + 1}</h1>
													<button
														type="button"
														className="btn btn-danger btn-lg  p-2 col-1"
														title="Remover Adicional"
														onClick={() => {
															let newAdditionalItemList = [...additionalItemList];
															newAdditionalItemList.splice(index, 1);
															setAdditionalItemList(newAdditionalItemList);
														}}
													>
														X
													</button>
												</div>
												<div className="row">
													<div className="form-group my-4 col-6">
														<label htmlFor="username" className="m-2">
															Nome do Adicional
														</label>
														<input
															type="text"
															value={item.additionalItemName}
															onChange={(e) => {
																let newAdditionalItemList = [...additionalItemList];
																newAdditionalItemList[index].additionalItemName = e.target.value;
																setAdditionalItemList(newAdditionalItemList);
															}}
															className="form-control p-3"
															id="username"
															placeholder="Nome do Adicional"
															required
														/>
													</div>
													<div className="form-group my-4 col-6">
														<label htmlFor="username" className="m-2">
															Preço do Adicional (R$)
														</label>
														<input
															type="number"
															step="0.50"
															value={item.price}
															onChange={(e) => {
																let newAdditionalItemList = [...additionalItemList];
																newAdditionalItemList[index].price = e.target.value;
																setAdditionalItemList(newAdditionalItemList);
															}}
															className="form-control p-3"
															id="username"
															placeholder="Preço do Adicional"
															required
														/>
													</div>
													<div className="form-group my-2 col">
														<label htmlFor="username" className="m-2">
															Descrição do Adicional
														</label>
														<textarea
															value={item.description}
															onChange={(e) => {
																let newAdditionalItemList = [...additionalItemList];
																newAdditionalItemList[index].description = e.target.value;
																setAdditionalItemList(newAdditionalItemList);
															}}
															className="form-control p-3"
															id="username"
															placeholder="Descrição do Adicional"
															required
														/>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className="text-end">
							<button type="button" onClick={cadastrarProduto} className="btn btn-success btn-lg my-4 p-3">
								cadastrar produto
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default menu;

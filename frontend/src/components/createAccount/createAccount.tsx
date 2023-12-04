import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import "./createAccount.css";
import { FaPerson } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { MdChangeCircle } from "react-icons/md";
import { useEffect } from "react";
function CreateAccount() {
	const navigate = useNavigate();
	const [isUser, setIsUser] = useState(true);
	const [isRestaurant, setIsRestaurant] = useState(false);
	const [image, setImage] = useState(
		"data:image/png;base64,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"
	);
	const [horaAbertura, setHoraAbertura] = useState("");
	const [horaFechamento, setHoraFechamento] = useState("");
	//set token to null
	useEffect(() => {
		localStorage.setItem("token", "nao");
	}, []);
	const handleISUser = () => {
		setIsUser(true);
		setIsRestaurant(false);
	};
	const handleISRestaurant = () => {
		setIsUser(false);
		setIsRestaurant(true);
	};
	const sendUser = () => {
		const username = document.getElementById("username") as HTMLInputElement;
		const password = document.getElementById("userPass") as HTMLInputElement;
		const cpf = document.getElementById("cpf") as HTMLInputElement;
		const address = document.getElementById("userAddress") as HTMLInputElement;
		const data = {
			username: username.value,
			password: password.value,
			address: address.value,
			registrationDocument: cpf.value,
			status: true,
		};
		console.log(data);
		//use axios to send data to backend
		axios
			.post("http://localhost:8001/comes-bebes/login/create-user/client", data)
			.then((response) => {
				console.log(response);
				Swal.fire({
					icon: "success",
					title: "Sucesso!",
					text: "Usuario cadastrado com sucesso!",
				});
			})
			.catch((error) => {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
				});
			});
	};
	const sendRestaurant = () => {
		const restName = document.getElementById("restName") as HTMLInputElement;
		const restPass = document.getElementById("restPass") as HTMLInputElement;
		const cnpj = document.getElementById("cnpj") as HTMLInputElement;
		const restAddress = document.getElementById("restAddress") as HTMLInputElement;
		const ownerAddress = document.getElementById("ownerAddress") as HTMLInputElement;
		const ownerName = document.getElementById("ownerName") as HTMLInputElement;
		const data = {
			username: ownerName.value,
			password: restPass.value,
			adress: ownerAddress.value,
			registrationDocument: cnpj.value,
			restaurant: {
				restaurantName: restName.value,
				address: restAddress.value,
				workTime: horaAbertura + " - " + horaFechamento,
				isOpen: true,
				restaurantImage: image,
			},
			status: true,
		};
		console.log(data);
		axios
			.post("http://localhost:8001/comes-bebes/login/create-user/owner", data)
			.then((response) => {
				console.log(response);
				Swal.fire({
					icon: "success",
					title: "Sucesso!",
					text: "Restaurante cadastrado com sucesso!",
				});
			})
			.catch((error) => {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
				});
			});
	};

	return (
		<>
			<div className="justify-content-start height-100 bg-color" id="body">
				<div className="zoom">
					{/*  cadastrar usuario */}
					<div hidden={isUser == false} id="cadastro_de_pessoa">
						<div className="container ">
							<form className="col-10 pt-5 mx-auto" autoComplete="off">
								<div className="row rounded-5 cor p-3 mx-3 d-flex justify-content-between">
									<div className="col">
										<FaPerson size={110} className="col-6  m-2 p-2" />
									</div>
									<div className="col">
										<h1 className="col-5 text-center my-auto fonteBonita">
											<br />
											<b>Novo usuario 😋</b>
										</h1>
									</div>
									<div className="col">
										<br />
										<br />
										<br />
										<div className="fonteBonita hover_underline p-2  rounded-4 cor2" onClick={handleISRestaurant}>
											<b>cadastrar um restaurante</b>
											<MdChangeCircle size={40} className="mx-2" />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="form-group my-4 col-6">
										<label htmlFor="username" className="m-2">
											Nome de Usuario
										</label>
										<input type="text" className="form-control p-3" id="username" placeholder="Nome de Usuario" required />
									</div>
									<div className="form-group my-4 col">
										<label htmlFor="userAddress" className="m-2">
											Endereço
										</label>
										<input type="text" className="form-control p-3" id="userAddress" placeholder="Endereço" required />
									</div>
								</div>
								<div className="row">
									<div className="col-6">
										<div className="form-group my-4">
											<label htmlFor="userPass" className="m-2">
												Senha
											</label>
											<input type="password" className="form-control p-3" id="userPass" placeholder="Senha" required />
										</div>
									</div>
									<div className="col-6">
										<div className="form-group my-4">
											<label htmlFor="cpf" className="m-2">
												CPF
											</label>
											<input type="text" className="form-control p-3" id="cpf" placeholder="cpf" required />
										</div>
									</div>
								</div>

								<div>
									<button type="button" className="btn btn-primary btn-lg my-4" onClick={sendUser}>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
					{/* cadastrar usuario */}

					{/* cadastrar restaurante */}
					<div hidden={isRestaurant == false} id="cadastro_de_restaurante">
						<div className="container">
							<form className="col-10 pt-5 mx-auto">
								<div className="row rounded-5 cor p-3 mx-3 d-flex justify-content-between">
									<div className="col">
										<FaShop size={110} className="col-6 m-2 " />
									</div>
									<div className="col">
										<h1 className="col-5 text-center my-auto fonteBonita">
											<br />
											<b>Novo restaurante 🍴</b>
										</h1>
									</div>
									<div className="col">
										<br />
										<br />
										<br />
										<div className="fonteBonita hover_underline p-2  rounded-4 cor2" onClick={handleISUser}>
											<b>cadastrar um usuario</b>
											<MdChangeCircle size={40} className="mx-2" />
										</div>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-6">
										<div className="form-group">
											<label htmlFor="ownerName" className="m-2">
												Nome do dono(a) do restaurante
											</label>
											<input type="text" className="form-control p-3" id="ownerName" placeholder="Nome do dono(a) do restaurante" required />
										</div>
									</div>
									<div className="col-6">
										<div className="form-group">
											<label htmlFor="restName" className="m-2">
												Nome do Restaurante
											</label>
											<input type="text" className="form-control p-3" id="restName" placeholder="Nome do Restaurante" required />
										</div>
									</div>
								</div>
								<div className="row">
									<div className="form-group col-8">
										<label htmlFor="restPass" className="m-2">
											Senha
										</label>
										<input type="password" className="form-control p-3" id="restPass" placeholder="Senha" required />
									</div>
									<div className="form-group col-4">
										<label htmlFor="cnpj" className="m-2">
											CNPJ
										</label>
										<input type="text" className="form-control p-3" id="cnpj" placeholder="cnpj" maxLength={14} pattern="[0-9]{14}" required />
									</div>
								</div>
								<div className="row">
									<div className="form-group col-6">
										<label htmlFor="restAddress" className="m-2">
											Endereço do Restaurante
										</label>
										<input type="text" className="form-control p-3" id="restAddress" placeholder="Endereço do Restaurante" required />
									</div>
									<div className="form-group col-6">
										<label htmlFor="ownerAddress" className="m-2">
											Endereço do dono(a) Restaurante
										</label>
										<input type="text" className="form-control p-3" id="ownerAddress" placeholder="Endereço do dono(a) Restaurante" required />
									</div>
								</div>
								<div className="row horarios border rounded-4 my-3 mx-1 p-3">
									<div className="col-6 d-flex">
										<label htmlFor="Abertura" className="mx-2">
											Horario de Abertura
										</label>
										<div className="col-5">
											<input
												type="time"
												id="Abertura"
												required
												className="col-3 form-control"
												onChange={(e) => {
													setHoraAbertura(e.target.value);
												}}
											/>
										</div>
									</div>
									<div className="col-5 d-flex">
										<label htmlFor="Fechamento" className="mx-2">
											Horario de Fechamento
										</label>
										<div className="col-5">
											<input
												type="time"
												id="Fechamento"
												required
												className="col-3 form-control"
												onChange={(e) => {
													setHoraFechamento(e.target.value);
												}}
											/>
										</div>
									</div>
								</div>
								<div>
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
																setImage(reader.result as string);
															};
														}
													}}
												/>
											</div>
										</div>
										<div className="col m-auto text-center ">
											<img src={image} alt="imagem" className="p-2 m-2 border border-5 rounded-3 tamanho_da_imagem" />
										</div>
									</div>
								</div>
								<div>
									<button type="button" className="btn btn-primary btn-lg my-4" onClick={sendRestaurant}>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
					{/* cadastrar restaurante */}
				</div>
			</div>
		</>
	);
}
export default CreateAccount;

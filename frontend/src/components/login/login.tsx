import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Swal from "sweetalert2";
import Navbar from "../navBar/NavBar";
function Login() {
	const navigate = useNavigate();

	const fazerLogin = () => {
		const nomeElement = document.getElementById("nome") as HTMLInputElement;
		const passElement = document.getElementById("pass") as HTMLInputElement;
		axios
			.post("http://localhost:8001/comes-bebes/login", {
				userName: nomeElement.value,
				password: passElement.value,
			})
			.then((response) => {
				if (response.data.message === "Success") {
					localStorage.setItem(
						"token",
						response.data.additionalInfo.jwtToken
					);
					localStorage.setItem(
						"username",
						response.data.additionalInfo.username
					);
					navigate("/MainPage");
				}
			})
			.catch((error) => {
				Swal.fire({
					position: "top",
					icon: "error",
					title: "usuario ou senha incorretos!!",
					showConfirmButton: false,
					timer: 2000,
				});
				//console.log(error);
				localStorage.clear();
			});
	};
	const [showPass, setShowPass] = useState(false);
	const handleShowPass = () => {
		setShowPass(!showPass);
		const passElement = document.getElementById("pass") as HTMLInputElement;
		if (showPass) {
			passElement.type = "password";
		} else {
			passElement.type = "text";
		}
	};
	return (
		<div
			style={{ backgroundColor: "#fcb431" }}
			className="d-flex justify-content-center"
		>
			<div className="col-sm-12 col-md-6 col-6">
				<img
					src="src\assets\comes-e-bebes.png"
					alt="comes-bebes"
					className="img"
				/>
			</div>
			<div className="col-4 pt-5 mt-5">
				<div className="pt-5 mt-5 col-10">
					<div className="input-group m-2">
						<div className="form-floating">
							<input
								type="text"
								className="form-control"
								required
								id="nome"
								placeholder="nome"
							/>
							<label htmlFor="pass">nome</label>
						</div>
					</div>
					<div className="input-group m-2">
						<div className="form-floating">
							<input
								type="password"
								className="form-control"
								required
								id="pass"
								placeholder="senha"
							/>
							<label htmlFor="pass">senha</label>
						</div>
						<button
							className="input-group-text"
							onClick={handleShowPass}
						>
							{showPass ? (
								<BsFillEyeSlashFill />
							) : (
								<BsFillEyeFill />
							)}
						</button>
					</div>
					<div className="row p-3">
						<button
							type="button"
							onClick={fazerLogin}
							className="btn btn-success mx-2 rounded-1 col-2"
						>
							entrar
						</button>
						<div className="col">
							<label htmlFor="criarConta" className="form-label">
								ainda não tem uma conta? &nbsp;
								<b
									id="criarConta"
									className="hover_underline py-2"
									onClick={() => {
										navigate("/CreateAccount");
									}}
								>
									Criar agora
								</b>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;

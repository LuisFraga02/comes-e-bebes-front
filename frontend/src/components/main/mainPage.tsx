import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function mainPage() {
	const navigate = useNavigate();

	const checkAuth = () => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/");
		}
	};

	useEffect(() => {
		return () => clearInterval(setInterval(checkAuth, 500));
	}, []);

	return (
		<div>
			<div className=""></div>
		</div>
	);
}
export default mainPage;

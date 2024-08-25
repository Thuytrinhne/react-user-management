import "./App.scss";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
	const { login } = useContext(UserContext);
	useEffect(() => {
		let token = localStorage.getItem("token");
		let email = localStorage.getItem("email");
		if (token && email) login(email, token);
	}, []);
	return (
		<>
			<div className="app-Container">
				<Header />
				<Container>
					<AppRoutes />
				</Container>
			</div>
			<ToastContainer />
		</>
	);
}

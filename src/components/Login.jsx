import { useState, useEffect, useContext } from "react";
import "../Login.scss";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export default function Login() {
	const [email, setEmail] = useState("");
	const [passWord, setPassWord] = useState("");
	const [isShowPassword, setIsShowPassword] = useState(false);
	const [loadingApi, setLoadingApi] = useState(false);
	const navigate = useNavigate();
	const { user, login } = useContext(UserContext);
	useEffect(() => {
		let token = localStorage.getItem("token");
		if (token) navigate("/"); // handle logic in practice
	}, []); // Chạy 1 lần khi component được mount
	const handleLoginClick = async () => {
		if (!email || !passWord) {
			toast.error("Both email and password are required ! ");
		} else {
			setLoadingApi(true);

			var res = await loginApi(email.trim(), passWord);
			if (res && res.token) {
				login(email, res.token);
				navigate("/");
				toast.success("Login successfully !!! ");
			} else if (res && res.status === 400) {
				toast.error(res.data.error);
			}
			setLoadingApi(false);
		}
	};
	const handleKeyDown = (event) => {
		if (event && event.keyCode === 13) {
			handleLoginClick();
		}
	};
	return (
		<div className="login-container col-12 col-sm-4">
			<div className="title">
				<h4>Log in</h4>
			</div>
			<div className="text">Email or username</div>

			<input
				value={email}
				type="text"
				class="form-control"
				placeholder="Email or username"
				onChange={(event) => {
					setEmail(event.target.value);
				}}
				onKeyDown={(event) => handleKeyDown(event)}
			/>
			<div className="pass-container">
				<input
					value={passWord}
					type={isShowPassword ? "text" : "password"}
					class="form-control"
					placeholder="Password"
					onChange={(event) => {
						setPassWord(event.target.value);
					}}
					onKeyDown={(event) => handleKeyDown(event)}
				/>

				<i
					className={
						isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
					}
					onClick={() => {
						setIsShowPassword(!isShowPassword);
					}}
				></i>
			</div>

			<button
				className={email && passWord ? "btn btn-danger" : "btn btn-secondary"}
				onClick={handleLoginClick}
				disabled={!(email && passWord) || loadingApi}
			>
				{loadingApi && <i class="fas fa-sync fa-spin"></i>}
				&nbsp; &nbsp; Login
			</button>
			<div className="back">
				<i className="fa-solid fa-chevron-left"></i>
				<span>Go back</span>
			</div>

			<textarea name="" id="">
				Note: "email": "eve.holt@reqres.in", "password": "cityslicka"
			</textarea>
		</div>
	);
}

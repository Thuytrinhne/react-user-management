import Home from "../components/Home";
import { Routes, Route } from "react-router-dom";
import TableUsers from "../components/TableUsers";
import Login from "../components/Login";
import { useState } from "react";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "./NotFound";
const AppRoutes = () => {
	const [listUsers, setListUsers] = useState([]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />

				<Route
					path="/users"
					element={
						<PrivateRoutes>
							<TableUsers listUsers={listUsers} setListUsers={setListUsers} />
						</PrivateRoutes>
					}
				/>

				<Route path="*" element={<NotFound></NotFound>} />
			</Routes>
		</>
	);
};
export default AppRoutes;

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
const PrivateRoutes = (props) => {
	const { user } = useContext(UserContext);
	if (user && !user.auth)
		return (
			<Alert variant="danger">
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<p>You are not authorized. Please log in !!!</p>
			</Alert>
		);
	return <>{props.children}</>;
};
export default PrivateRoutes;

import Alert from "react-bootstrap/Alert";

const NotFound = () => {
	return (
		<Alert variant="danger">
			<Alert.Heading>404 NOT FOUND!</Alert.Heading>
			<p>Sorry the page you are searching is not existed !!! </p>
		</Alert>
	);
};
export default NotFound;

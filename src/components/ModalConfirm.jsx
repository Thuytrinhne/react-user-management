import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";

export default function ModalConfirm(props) {
	const [show, setShow] = useState(false);
	const { userToDelete, handleAfterDelete } = props;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleDeleteUser = async () => {
		var res = await deleteUser(userToDelete.id);
		if (res && +res.statusCode === 204) {
			handleClose();
			handleAfterDelete(userToDelete);
			toast.success(`Delete user successfully`);
		} else {
			toast.error("An error has occurred, please check again.");
		}
	};
	return (
		<>
			<Button variant="danger" onClick={handleShow}>
				Delete
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Delete A User</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure to delete this user ? <br />
					with Email = <b>{userToDelete.email}</b>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={handleDeleteUser}>
						Yes
					</Button>
					<Button variant="danger" onClick={handleClose}>
						No
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { postCreateUser, putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

export default function ModalUpSert({
	handleAfterUpdate,
	userToUpdate,
	isUpdateMode = false,
}) {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const [job, setJob] = useState("");
	useEffect(() => {
		if (isUpdateMode && userToUpdate) {
			setName(userToUpdate.first_name || "");
			setJob(userToUpdate.job || "");
		}
	}, [isUpdateMode, userToUpdate]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSaveUser = async () => {
		if (isUpdateMode) {
			await handleUpdateUser();
		} else {
			await handleAddUser();
		}
	};
	const handleUpdateUser = async () => {
		let res = await putUpdateUser(name, job);
		if (res && res.updatedAt) {
			const newUser = {
				id: userToUpdate.id,
				first_name: res.name,
			};
			handleClose();
			handleAfterUpdate(newUser);
		}
	};
	const handleAddUser = async () => {
		let res = await postCreateUser(name, job);
		if (res && res.id) {
			const newUser = {
				id: res.id,
				first_name: res.name,
				last_name: "",
				email: "",
			};

			handleClose();
			setName("");
			setJob("");
			toast.success("A user was created successfully !!!");
			handleAfterUpdate(newUser);
			// here is fake api,  in real we wil fetch to get new list user and update state
		} else {
			toast.error("An error has occurred, please check again.");
		}
	};
	return (
		<>
			<Button
				variant={isUpdateMode ? "warning" : "primary"}
				onClick={handleShow}
				className={isUpdateMode ? "mx-3" : ""}
			>
				{isUpdateMode ? (
					"Edit"
				) : (
					<>
						<i class="fa-solid fa-circle-plus"></i> ADD NEW USER
					</>
				)}
			</Button>

			<Modal
				backdrop="static"
				keyboard={false}
				show={show}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{isUpdateMode ? "Edit A User" : "Add New User"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<div className="form-group mb3">
							<label>Name</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter name"
								value={name}
								onChange={(event) => setName(event.target.value)}
							/>
						</div>
						<div className="form-group mb3">
							<label>Job</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter job"
								value={job}
								onChange={(event) => setJob(event.target.value)}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSaveUser}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

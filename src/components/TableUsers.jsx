import { Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserService";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ModalUpSert from "./ModalUpSert";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import "../TableUsers.scss";
export default function TableUsers({ listUsers, setListUsers }) {
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [sortBy, setSortBy] = useState("asc");
	const [sortField, setSortField] = useState("id");

	useEffect(() => {
		getUsers(1);
	}, []);

	const getUsers = async (page) => {
		let res = await fetchAllUser(page);
		if (res && res.data) {
			setListUsers(res.data);
			setTotalUsers(res.total);
			setTotalPages(res.total_pages);
		}
	};
	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		getUsers(+event.selected + 1);
		// + convert string to number
	};
	const handleEditUser = (user) => {
		// trỏ đến 2 vùng nhớ khác nhau, k ảnh hưởng đến listUsers
		let cloneListUsers = _.cloneDeep(listUsers);
		let index = listUsers.findIndex((item) => item.id == user.id);
		cloneListUsers[index].first_name = user.first_name;
		setListUsers(cloneListUsers);
	};
	const handleDeleteUser = (user) => {
		let cloneListUsers = _.cloneDeep(listUsers);
		cloneListUsers = cloneListUsers.filter((u) => u.id !== user.id);
		setListUsers(cloneListUsers);
	};
	const handleSort = (sortField, sortBy) => {
		setSortBy(sortBy);
		setSortField(sortField);
		// quản lý 2 state này để load lại trang k bị mất sort + số trang -> gán nó trên url  rồi gán
		// lại vào state là oke
		let cloneListUsers = _.cloneDeep(listUsers);

		let sortedUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
		console.log(sortedUsers);
		setListUsers(sortedUsers);
	};
	const handleUpdateTable = (newUser) => {
		setListUsers([newUser, ...listUsers]);
	};

	const handleSearchByEmail = debounce((event) => {
		let cloneListUsers = _.cloneDeep(listUsers);
		let term = event.target.value;
		console.log(term);

		if (term) {
			let filteredUsers = cloneListUsers.filter((item) =>
				item.email.includes(term)
			);
			setListUsers(filteredUsers);
		} else getUsers(1);
	}, 500);
	return (
		<>
			<div className="my-3 d-flex justify-content-between">
				<span>
					<h3>List Users:</h3>
				</span>
				<ModalUpSert handleAfterUpdate={handleUpdateTable} />
			</div>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>
							<div className="sortHeader">
								<span>ID</span>
								<span>
									<i
										onClick={() => handleSort("id", "desc")}
										class="fa-solid fa-arrow-down-long"
									></i>
									<i
										onClick={() => handleSort("id", "asc")}
										class="fa-solid fa-arrow-up-long"
									></i>
								</span>
							</div>
						</th>
						<th>Email</th>
						<th>
							<div className="sortHeader">
								<span>First Name</span>
								<span>
									<i
										onClick={() => handleSort("first_name", "desc")}
										class="fa-solid fa-arrow-down-long"
									></i>
									<i
										onClick={() => handleSort("first_name", "asc")}
										class="fa-solid fa-arrow-up-long"
									></i>
								</span>
							</div>
						</th>
						<th>Last Name</th>
						<th>Actions</th>
					</tr>
					<tr>
						<th></th>
						<th>
							<input
								type="text"
								onChange={(event) => {
									handleSearchByEmail(event);
								}}
							/>
						</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{listUsers &&
						listUsers.length > 0 &&
						listUsers &&
						listUsers.map((item) => {
							return (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.email}</td>
									<td>{item.first_name}</td>
									<td>{item.last_name}</td>
									<td>
										<ModalUpSert
											handleAfterUpdate={handleEditUser}
											isUpdateMode={true}
											userToUpdate={item}
										/>

										<ModalConfirm
											userToDelete={item}
											handleAfterDelete={handleDeleteUser}
										/>
									</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={1}
				pageCount={totalPages}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
			/>
		</>
	);
}

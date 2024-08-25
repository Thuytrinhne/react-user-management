import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logoApp from "../assets/images/main-logo.png";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
export default function Header() {
	const navigate = useNavigate();
	const { user, logout } = useContext(UserContext);
	let location = useLocation();
	const handleLogout = () => {
		logout();
		navigate("/login");
		toast.success("Log out successfully !!! ");
	};
	// const a = null;
	// a.abc; for test error boundary but not work
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">
					<img
						alt="React Logo"
						src={logoApp}
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>
					<span>NOVOBI</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto" activeKey={location.pathname}>
						{user && user.auth === true && (
							<>
								<NavLink to="/" className="nav-link">
									Home
								</NavLink>

								<NavLink to="/users" className="nav-link">
									Manage Users
								</NavLink>
							</>
						)}
					</Nav>

					<Nav>
						{user && user.email && (
							<span className="nav-link">
								Welcome <b>{user.email}</b>
							</span>
						)}
						<NavDropdown title="Setting" id="basic-nav-dropdown">
							{user && user.auth === false ? (
								<NavLink to="/login" className="dropdown-item">
									Login
								</NavLink>
							) : (
								<NavDropdown.Item onClick={handleLogout}>
									Logout
								</NavDropdown.Item>
							)}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

import React from "react";
// @function  UserContext
export const UserContext = React.createContext({ email: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
export const UserProvider = ({ children }) => {
	const [user, setUser] = React.useState({ email: "", auth: false });

	const login = (email, token) => {
		localStorage.setItem("token", token);
		localStorage.setItem("email", email);

		setUser((user) => ({
			email: email,
			auth: true,
		}));
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser((user) => ({
			email: "",
			auth: false,
		}));
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

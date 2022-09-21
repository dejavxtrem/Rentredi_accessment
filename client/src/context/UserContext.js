import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
	const [userData, setUserData] = useState();

	const getUser = async () => {
		const { data } = await axios.get("/api/v1/users");
		if (data) {
			const userArrayData = Object.values(data);
			setUserData(userArrayData);
		}
	};

	const createUser = async (name, zipCode) => {
		const { data } = await axios.post("/api/v1/createUser", {
			name,
			zipCode,
		});
	};

	useEffect(() => {
		if (!userData) {
			getUser();
		}
	}, []);

	return (
		<UserContext.Provider value={{ userData, createUser, getUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;

export const useUserContext = () => useContext(UserContext);

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Dashboard() {
	const [user, setUser] = useState({
		email: "",
		username: "",
	});
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await getProfile();
			} catch (error) {
				router.push("/login");
			}
		};

		checkAuth();
	}, []);

	const getProfile = async () => {
		const response = await axios.get("/api/profile");
		setUser(response.data);
	};

	const logout = async () => {
		try {
			await axios.post("/api/auth/logout");
			router.push("/login");
		} catch (error) {
			console.error(error);
			router.push("/login");
		}
	};

	return (
		<div>
			<h1>Dashboard</h1>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<button onClick={() => getProfile()}>Get Profile</button>
			<button onClick={() => logout()}>LogOut</button>
		</div>
	);
}

export default Dashboard;

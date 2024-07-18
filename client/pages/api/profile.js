import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
	// Extraer el token
	const { myTokenName } = req.cookies;

	if (!myTokenName) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const user = verify(myTokenName, "secret");
		return res.json({ email: user.email, username: user.username });
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: "Invalid or expired token" });
	}
}

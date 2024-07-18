import jwt from "jsonwebtoken";
import { serialize } from "cookie";

/* Manejador de peticiones */
export default function loginHandler(req, res) {
	const { email, password } = req.body;

	/* Verificar si el email y la password son validos */
	/* Si el mail existe */
	/* Si la password existe */

	/* Checkear si los datos coinciden en la BD */
	if (email === "ejemplo@gmail.com" && password === "admin") {
		/* Generar Json Web Token, el string es para hacer unico al token, se puede utilizar una variable de entorno, es un codigo privado que deberia tener el backend */
		const token = jwt.sign(
			{
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
				email: "admin.gmail.com",
				username: "admin",
			},
			"secret"
		);
		/* Serializar el token
		(Nombre Cookie que quiero generar, valor cookie) */
		const serialized = serialize("myTokenName", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "none",
			maxAge: 1000 * 60 * 60 * 24 * 30,
			path: "/",
		});
		/* Enviar Token a traves del header */
		res.setHeader("Set-Cookie", serialized);
		return res.json("login exitoso");
	}
	/* Si no coinciden */
	return res.status(401).json({ error: "email o password invalido" });
}

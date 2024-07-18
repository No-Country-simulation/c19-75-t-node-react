import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(req) {
	const { cookies } = req;
	const token = cookies.myTokenName;

	if (!token) {
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	try {
		verify(token, "secret");
		return NextResponse.next();
	} catch (error) {
		console.error(error);
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}
}

export const config = {
	matcher: ["/dashboard"],
};

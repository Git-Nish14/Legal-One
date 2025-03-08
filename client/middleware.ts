import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const authCookie = req.cookies.get("Authorization")?.value || "";
    const isAuthenticated = authCookie.startsWith("Bearer ");

    const { pathname } = req.nextUrl;

    // Protected routes (Everything after "/home")
    if (pathname.startsWith("/home") && !isAuthenticated) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Public routes where authenticated users shouldn't be
    if (["/", "/signup", "/signin"].includes(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to relevant routes
export const config = {
    matcher: ["/", "/signup", "/signin", "/home:path*", "/home/:path*"], // Protects /home and everything after
};

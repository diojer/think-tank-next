import { authMiddleware } from "@clerk/nextjs/server";
import * as jose from "jose";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export default authMiddleware({
  ignoredRoutes: ["((?!^/portal).*)"],
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function middleware(request) {
  const spki = process.env.NEXT_PUBLIC_CLERK_JWT;
  const protections = [
    // { route: "/posts", methods: ["POST", "PUT", "DELETE"] },
    { route: "/sponsors", methods: ["POST", "PUT", "DELETE"] },
    { route: "/jobs", methods: ["POST", "PUT", "DELETE"] },
    { route: "/migrate", methods: ["GET", "POST", "PUT", "DELETE"] },
  ];
  try {
    let protectionNeeded = false;

    //cycle through routes and methods to see if protection is needed
    protections.map((protection, key, arr) => {
      if (request.url.includes(protection.route)) {
        protectionNeeded = protection.methods.includes(request.method);
      }
    });

    if (protectionNeeded) {
      // check auth if they are using a protected method on a protected route
      const session_token = request.cookies.get("__session")
        ? request.cookies.get("__session").value
        : undefined;
      const header_token = headers().get("authorization");

      //send to login page if no session/token detected
      if (!session_token && !header_token) {
        throw { message: "Not signed in." };
      }

      //if there is token, verify token
      const publicKey = await jose.importSPKI(spki, "RS256");

      const { payload } = await jose.jwtVerify(
        header_token ? header_token : session_token,
        publicKey
      );
      if (payload.metadata.role !== "admin") {
        throw { message: "Not authorised" };
      }
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, spki: spki },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

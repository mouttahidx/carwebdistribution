import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = withAuth({
  pages: {
    signIn: "/auth/connexion",
  },
});

// Custom wrapper for NextAuth middleware
export async function checkAuth(req) {
  return authMiddleware(req);
}

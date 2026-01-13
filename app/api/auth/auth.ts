import { authHandler } from "encore.dev/auth"
import { eq } from "drizzle-orm"    
import { db } from "@db"
import { users } from "@db/schema/users"
import { organizationMembers } from "@db/schema/organization-members"
import { Header } from "encore.dev/api"
import { APIError } from "encore.dev/api"
import { betterAuth } from "better-auth"

// apps/api/auth/encore.service.ts
import { Service } from "encore.dev/service";
// export default new Service("auth");

export const auth = betterAuth({
  database: process.env.DATABASE_URL,
  secret: process.env.AUTH_SECRET!,
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,     // refresh every 1 day
  },
  emailAndPassword: {
    enabled: true,
  },
})

interface AuthParams {
  authorization: Header<"Authorization">;
}

export type AuthData = {
  userID: string;
  organizationID: string; 
  role: "admin" | "member"; 
};

// Auth Handler 
export const authHandlerInstance = authHandler<AuthParams, AuthData>(
  async ({ authorization }) => {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw APIError.unauthenticated("missing authorization header");
    }

    const sessionToken = authorization.slice("Bearer ".length).trim();
    
    //  Verify session using Authorization header
    const session = await auth.api.getSession({
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (!session || !session.user) {
      throw APIError.unauthenticated("invalid or expired session");
    }

    //  Lấy organization context 
    const [member] = await db
      .select()
      .from(organizationMembers)
      .where(eq(organizationMembers.userId, session.user.id))
      .limit(1);

    return {
      userID: session.user.id,
      organizationID: member?.organizationId,
      role: member?.role as "admin" | "member"
    };
  }
);
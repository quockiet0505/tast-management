import { db } from "@db"
import { users } from "@db/schema/users";
import { organizations } from "@db/schema/organizations";
import { organizationMembers } from "@db/schema/organization-members";

import { eq } from "drizzle-orm";

export const AuthRepo = {

  findUserByEmail(data: { email: string }) {
          return db
          .select()
          .from(users)
          .where(eq(users.email, data.email))
          .limit(1)
     },
     

  createUser(data: { email: string; passwordHash: string }) {
    return db
      .insert(users)
      .values({
        email: data.email,
        passwordHash: data.passwordHash,
      })
      .returning();
  },

  createOrganization(data: { name: string }) {
    return db
      .insert(organizations)
      .values({
        name: data.name,
      })
      .returning();
  },

  addOrganizationMember(data: {
    userId: string;
    organizationId: string;
    role: "admin" | "member";
  }) {
    return db.insert(organizationMembers).values({
      userId: data.userId,
      organizationId: data.organizationId,
      role: data.role,
    });
  },

  // getUserOrganization
  getUserOrganization(data: { userId: string }) {
    return db
      .select()
      .from(organizationMembers)
      .where(eq(organizationMembers.userId, data.userId))
      .then((res) => res[0]);
  },
};

import {pgTable, uuid, text, timestamp, primaryKey} from "drizzle-orm/pg-core";

import {organizations} from "./organizations"
import {users} from "./users";

export const organizationMembers = pgTable("organization_members", {
     userId: uuid("user_id").notNull().
     references(() => users.id),
     organizationId: uuid("organization_id").notNull().
     references(() => organizations.id),
     role: text("role").notNull(),  //admin, member
},
     (table) =>({
          pk: primaryKey({
               columns: [table.userId, table.organizationId]
          })
     })

)
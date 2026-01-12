import {pgTable, uuid, text, timestamp, date} from "drizzle-orm/pg-core";

import { organizationMembers } from "./organization-members";
import {users} from "./users";
import { organizations } from "./organizations";

export const tasks= pgTable("tasks", {
     id: uuid("id").primaryKey().defaultRandom(),
     title: text("title").notNull(),
     description: text("description"),
     status: text("status").notNull(), // todo, in-progress, done
     priority: text("priority").notNull(), //low, medium, high

     dueDate: date("due_date").notNull(),
     organizationId: uuid("organization_id").notNull().references(()=> organizations.id),

     assignedTo: uuid("assigned_to").references(() => users.id),
     createdAt: timestamp("created_at").defaultNow().notNull(),
})

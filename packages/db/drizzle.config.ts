// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
     dialect: "postgresql",
     schema: "./schema/*.ts",
     // nơi sinh migration
     out: "./migrations",
     dbCredentials: {
          url: "postgresql://postgres:12345678@localhost:5432/task-db",
     },
   });
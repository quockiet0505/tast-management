//    - `POST /v1/tasks` - List tasks (with filters)
//    - `GET /v1/tasks/:id` - Get task details
//    - `POST /v1/tasks/create` - Create task
//    - `PUT /v1/tasks/:id` - Update task
//    - `DELETE /v1/tasks/:id` - Delete task

// Quy tắc:
// GET /:id → (params, ctx)
// Có body → (body, ctx)
// Có cả params + body → (params, body, ctx)

import { api, APIError } from "encore.dev/api"
import { TaskService } from "./task.service"
import {
     CreateTaskSchema,
     UpdateTaskSchema,
     ListTaskSchema
   } from "./task.schema"
import { getAuthData } from "~encore/auth";
import { AuthData } from "../auth/auth";
   
//    - `POST /v1/tasks` - List tasks (with filters)
export const listTasks = api(
     { method: "POST", path: "/v1/tasks", auth: true},
     async (body: object) => {
      // getAuthData
       const input = ListTaskSchema.parse(body)
       const authData = getAuthData() as unknown as AuthData | undefined;

       if (!authData) throw APIError.unauthenticated("missing auth");
       return TaskService.getList(input, {
         organizationId: authData.organizationID,
       })
     }
   )
//    - `GET /v1/tasks/:id` - Get task details
export const getTaskDetails = api(
     { method: "GET", path: "/v1/tasks/:id" , auth: true},
     async (params: { id: string }) => {
       const authData = getAuthData() as unknown as AuthData | undefined;

       if (!authData) throw APIError.unauthenticated("missing auth");
       return TaskService.getDetails({
          id: params.id,
          organizationId: authData.organizationID,
       })
     }
   )
//    - `POST /v1/tasks/create` - Create task
export const createTask = api(
     { method: "POST", path: "/v1/tasks/create" , auth: true},
     async (body: object) => {
       const input = CreateTaskSchema.parse(body)
       const authData = getAuthData() as unknown as AuthData | undefined;

       if (!authData) throw APIError.unauthenticated("missing auth");
       return TaskService.createTask(input, { organizationId : authData.organizationID } )
     }
   )
//    - `PUT /v1/tasks/:id` - Update task
type UpdateTaskParams = { id: string } & Record<string, unknown>
export const updateTask = api(
     { method: "PUT", path: "/v1/tasks/:id", auth: true },
     async (params: UpdateTaskParams) => {
       const { id, ...payload } = params as UpdateTaskParams
       const input = UpdateTaskSchema.parse(payload)
       const authData = getAuthData() as unknown as AuthData | undefined;

       if (!authData) throw APIError.unauthenticated("missing auth");
       return TaskService.updateTask(input, {
         id,
         organizationId: authData.organizationID,
       })
     }
   )
//    - `DELETE /v1/tasks/:id` - Delete task
export const deleteTask = api(
     { method: "DELETE", path: "/v1/tasks/:id", auth: true },
     async (params: { id: string }) => {
      const authData = getAuthData() as unknown as AuthData | undefined;
      
       if (!authData) throw APIError.unauthenticated("missing auth");
       return TaskService.deleteTask({
         id: params.id,
         organizationId: authData.organizationID,
       })
     }
   )


   
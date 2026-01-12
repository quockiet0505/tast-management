//    - `POST /v1/tasks` - List tasks (with filters)
//    - `GET /v1/tasks/:id` - Get task details
//    - `POST /v1/tasks/create` - Create task
//    - `PUT /v1/tasks/:id` - Update task
//    - `DELETE /v1/tasks/:id` - Delete task

// Quy tắc:
// GET /:id → (params, ctx)
// Có body → (body, ctx)
// Có cả params + body → (params, body, ctx)

import { api } from "encore.dev/api"
import { TaskService } from "./task.service"
import {
     CreateTaskSchema,
     UpdateTaskSchema,
     ListTaskSchema
   } from "./task.schema"
   
   
//    - `POST /v1/tasks` - List tasks (with filters)
export const listTasks = api(
     { method: "POST", path: "v1/tasks"},
     async (body: object) => {
       const input = ListTaskSchema.parse(body)
       const { organizationId } = getAuthData<{ organizationId: string }>()
       return TaskService.getList(input, { organizationId })
     }
   )
   
//    - `GET /v1/tasks/:id` - Get task details
export const getTaskDetails = api(
     { method: "GET", path: "v1/tasks/:id" },
     async (params: { id: string }) => {
       const { organizationId } = getAuthData<{ organizationId: string }>()
       return TaskService.getDetails({
         id: params.id,
         organizationId,
       })
     }
   )
   
//    - `POST /v1/tasks/create` - Create task
export const createTask = api(
     { method: "POST", path: "v1/tasks/create" },
     async (body: object) => {
       const input = CreateTaskSchema.parse(body)
       const { organizationId } = getAuthData<{ organizationId: string }>()
       return TaskService.createTask(input, { organizationId })
     }
   )
     
//    - `PUT /v1/tasks/:id` - Update task
type UpdateTaskParams = { id: string } & Record<string, unknown>
export const updateTask = api(
     { method: "PUT", path: "v1/tasks/:id" },
     async (params: UpdateTaskParams) => {
       const { id, ...payload } = params as UpdateTaskParams
       const input = UpdateTaskSchema.parse(payload)
       const { organizationId } = getAuthData<{ organizationId: string }>()
       return TaskService.updateTask(input, {
         id,
         organizationId,
       })
     }
   )
    
//    - `DELETE /v1/tasks/:id` - Delete task
export const deleteTask = api(
     { method: "DELETE", path: "v1/tasks/:id" },
     async (params: { id: string }) => {
       const { organizationId } = getAuthData<{ organizationId: string }>()
       return TaskService.deleteTask({
         id: params.id,
         organizationId,
       })
     }
   )
   

function getAuthData<T>(): { organizationId: any } {
     throw new Error("Function not implemented.")
}
   
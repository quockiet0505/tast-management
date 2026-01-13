// business logic
import { TaskRepo } from "./task.repo"
import { APIError } from "encore.dev/api"
import { ErrCode } from "encore.dev/api"

import type { CreateTaskInput, UpdateTaskInput, ListTaskInput} from "./task.schema"

export const TaskService = {
     // create
     async createTask(
          input: CreateTaskInput,
          ctx: { organizationId: string }  // ctx: context 
        ) {
          const [task] = await TaskRepo.createTask({
            title: input.title,
            description: input.description,
            status: input.status,
            priority: input.priority,
            dueDate: input.dueDate ?? new Date().toISOString(),
            assignedTo: input.assignedTo,
            organizationId: ctx.organizationId,
          });
        
          return task;
        },
        

     // get details
     getDetails(
          input: {id: string, organizationId: string}
     ){
          const task = TaskRepo.getById({
               id: input.id,
               organizationId: input.organizationId
          })

          if(!task){
               throw new APIError(
                    ErrCode.NotFound, "Task not found!"
               )
          }

          return task;
     },

     // list
     getList(
          input: ListTaskInput,
          ctx: { organizationId: string }
        ) {
          const tasks = TaskRepo.list({
            ...input,
            organizationId: ctx.organizationId,
          });
        
          return tasks;
        },
        

     // update 
     updateTask(
          input: UpdateTaskInput,
          ctx: {id: string, organizationId: string}
     ){
          const task = TaskRepo.getById({
               id: ctx.id,
               organizationId: ctx.organizationId
          })

          // check
          if(!task) {
               throw new APIError(
                    ErrCode.NotFound, "Task not found!"
               )
          }

          const updatedTask = TaskRepo.update({
               id: ctx.id,
               organizationId: ctx.organizationId,
               values: input 
          })

          return updatedTask;
     },

     // delete task
     async deleteTask(
          input: {id: string, organizationId: string}
     ){
          const task = await TaskRepo.getById({
               id: input.id,
               organizationId: input.organizationId
          })

          // check
          if(!task) {
               throw new APIError(
                    ErrCode.NotFound, "Task not found!"
               )
          }

          await TaskRepo.delete({
               id: input.id,
               organizationId: input.organizationId
          })

          return;
     }
}
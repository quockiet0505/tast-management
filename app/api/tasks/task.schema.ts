// validate request from body
import {z} from "zod"

export const TaskStatusSchema = z.enum([
     "todo",
     "in-progress",
     "done"
])

export const TaskPrioritySchema = z.enum([
     "low",
     "medium",
     "high"
])

// create
export const CreateTaskSchema = z.object({
     title: z.string().min(1, "Title is required!"),
     description: z.string().optional(),
     status: TaskStatusSchema.default("todo"),
     priority: TaskPrioritySchema.default("medium"),
     dueDate: z.string().optional(),
     assignedTo: z.uuid(),
}
)

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>

// Update
export const UpdateTaskSchema = z.object({
     title: z.string().min(1, "Title is required!").optional(),
     description: z.string().optional(),
     status: TaskStatusSchema.optional(),
     priority: TaskPrioritySchema.optional(),
     dueDate: z.string().optional(),
     assignedTo: z.uuid().optional(),
})

export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>

// Delete
export const DeleteTaskSchema = z.object({

})

// task details
export const TaskDetailsSchema = z.object({

})

// list task
export const ListTaskSchema = z.object({
     status: TaskStatusSchema,
     priority: TaskPrioritySchema,
     assignedTo: z.uuid(),
})

export type ListTaskInput = z.infer<typeof ListTaskSchema>




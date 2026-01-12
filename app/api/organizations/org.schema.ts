import {z} from "zod"

// create
export const CreateOrganizationSchema = z.object({
     name: z.string().min(1, "Name is required!")
})

export type CreateOrganizationInput = z.infer<typeof CreateOrganizationSchema>




// db access
import { db} from "@db"
import { tasks} from "@db/schema/tasks"
import { eq, and } from "drizzle-orm"

export const TaskRepo = {
     // create task
     createTask( data: {
          title: string,
          description?: string,
          status: string,
          priority: string,
          dueDate: string,
          organizationId: string,
          assignedTo:  string
     }){
          return db.insert(tasks).values({
               organizationId: data.organizationId,
               title: data.title,
               description: data.description,
               status: data.status,
               priority: data.priority,
               dueDate: data.dueDate,
               assignedTo: data.assignedTo
          }).returning()
     },

     //get by id
     getById( data: {
          id: string,
          organizationId: string
     }){
          return db.select().from(tasks).where(
               and(
                    eq(tasks.id, data.id),
                    eq(tasks.organizationId, data.organizationId)
               )
          ).limit(1).then( res => res[0])
     },

     // list
     list( data: {
          organizationId: string,
          status: string;
          priority: string;
          assignedTo: string;

     }){
          const conditions = [eq(tasks.organizationId, data.organizationId)]

          if(data.status){
               conditions.push(eq(tasks.status, data.status))
          }

          if(data.priority){
               conditions.push(eq(tasks.priority, data.priority))
          }

          if(data.assignedTo){
               conditions.push(eq(tasks.assignedTo, data.assignedTo))
          }

          return db.select().from(tasks).where(
               and(...conditions)
          )
     },

     // Update
     update( data: {
          id: string,
          organizationId: string,
          values: Partial<{
               title: string;
               description: string;
               status: string;
               priority: string;
               dueDate: string;
               assignedTo: string;
          }>;
     }){
          return db.update(tasks).set(
               data.values
          ).where(
               and(
                    eq(tasks.id, data.id),
                    eq(tasks.organizationId, data.organizationId)
               )
          ).returning()
     },

     // delete
     delete(data: {
          id: string,
          organizationId: string
     }){
          return db.delete(tasks).where(
               and(
                    eq(tasks.id, data.id),
                    eq(tasks.organizationId, data.organizationId)
               )
          )
     },
}
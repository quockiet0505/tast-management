
import {db} from "@db"
import {organizations} from "@db/schema/organizations";
import {eq} from "drizzle-orm";

export const OrganizationRepo = {
     // get by id
     getById( data: {
          id: string
     }){
          return db.select().from(organizations).where(
               eq(organizations.id, data.id)
          ).limit(1).then( res => res[0])
     },

     // list all organizations
     listAll(){
          return db.select().from(organizations);
     },

     // create organization
     createOrganization( data: {
          name: string
     }){
          return db.insert(organizations).values({
               name: data.name
          }).returning()
     }
}
//  business logic

import { OrganizationRepo } from "./org.repo"
import { APIError } from "encore.dev/api"
import { ErrCode } from "encore.dev/api"

export const OrganizationService  = {
     async getMyOrganization(
          ctx: { organizationId: string }
     ){
          const organization = await OrganizationRepo.getById({
               id: ctx.organizationId
          })

          if(!organization){
               throw new APIError(
                    ErrCode.NotFound, "Organization not found!"
               )
          }

          return organization;
     
     }
}
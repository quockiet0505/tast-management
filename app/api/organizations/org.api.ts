
// api
import {api} from "encore.dev/api"
import { OrganizationService } from "./org.service"
import { getAuthData } from "~encore/auth"; 
import {APIError} from "encore.dev/api"
import {ErrCode} from "encore.dev/api"
import type { AuthData } from "../auth/auth"

//    - `GET /v1/organizations/me` - Get my organization details
export const getMyOrganization = api(
     { method: "GET", path: "/v1/organizations/me", auth: true},
     
     async () => { 
          try{
               // get organizationId from auth context
               const authData = getAuthData() as unknown as AuthData | undefined;

               if (!authData) {
                 throw new APIError(
                   ErrCode.Unauthenticated,
                   "Authentication required"
                 );
               }
               
               const organizationId = authData.organizationID;
               
     
               if(!organizationId){
                    throw new APIError(
                         ErrCode.Unauthenticated,
                         "Organization failed"
                    )
               }
               // call service
               const organization = await OrganizationService.getMyOrganization({
                    organizationId: organizationId
               })
               return {
                    data: organization,
                    message: "Organization retrieved successfully"
               }
          }
          catch(error){
               return {
                    success: false,
                    message: (error as Error).message || "Failed to retrieve organization"
               }
          }
     }
)

// api
import {api} from "encore.dev/api"
import { OrganizationService } from "./org.service"

//    - `GET /v1/organizations/me` - Get my organization details
export const getMyOrganization = api(
     { method: "GET", path: "v1/organizations/me" },
     async () => {
          // get organizationId from auth context
          const { organizationId } = getAuthData<{ organizationId: string }>()
          // call service
          const organization = await OrganizationService.getMyOrganization({
               organizationId,
          })
          return organization
     }
)
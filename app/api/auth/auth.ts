import { authHandler } from "encore.dev/auth"

interface AuthParams {
  authorization?: string
}

interface AuthData {
  userID: string
  organizationId: string
}

// Tạo auth handler
export const auth = authHandler<AuthParams, AuthData>(
  async (params: AuthParams) => {
    return {
      userID: "mock-user-id",
      organizationId: "mock-org-id"
    }
  }
)
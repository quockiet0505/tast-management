// auth.service.ts
import { auth } from "./auth" 
import { AuthRepo } from "./auth.repo"
import { APIError } from "encore.dev/api";
import { ErrCode } from "encore.dev/api";
import type { RegisterInput, LoginInput } from "./auth.schema"

export const AuthService = {
  async register(input: RegisterInput) {
    // check email 
    const existingUser = await AuthRepo.findUserByEmail({
      email: input.email,
    });

    if (existingUser.length !== 0) {
      throw new APIError(
        ErrCode.AlreadyExists,
        "Email is already registered"
      )
    }

    //  user  Better-Auth, hash password
    const result = await auth.api.signUpEmail({
     body: {  
       email: input.email,
       password: input.password,
       name: input.email.split('@')[0], 
     },
   });

   if(!result || !result.user || !result.token){
          throw new APIError(
          ErrCode.Unauthenticated,
          "Registration failed"
          );
     }
   
    // organization 
    const [organization] = await AuthRepo.createOrganization({
      name: input.organizationName
    });

    // user add organization
    await AuthRepo.addOrganizationMember({
      userId: result.user.id,
      organizationId: organization.id,
      role: "member",
    });

    // session token
    return {
      user: {
        id: result.user.id,
        email: result.user.email,
      },
      organization: {
        id: organization.id,
        name: organization.name,
      },
      session: {
          token: result.token,  // Dùng result.token instead of session.token
          expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000) // 7 days
      }
    };
  },

  async login(input: LoginInput) {
    // Login với Better-Auth
    const result = await auth.api.signInEmail({
     body: {  
       email: input.email,
       password: input.password,
     },
   });


    if (!result || !result.user || !result.token) {
      throw new APIError(
        ErrCode.Unauthenticated,
        "Invalid email or password"
      );
    }

    //   organization context
    const member = await AuthRepo.getUserOrganization({ userId: result.user.id });

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
      },
      organization: member ? {
        id: member.organizationId,
        role: member.role
      } : null,
      session: {
        token: result.token,
        expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000) // 7 days
      }
    };
  }
};
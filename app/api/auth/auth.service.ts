// Check email, hash password, generate JWT token, flow
import bcrypt  from "bcryptjs"
import { AuthRepo } from "./auth.repo"
import { APIError } from "@shared/errors/api-error"
import { ErrCode } from "@shared/errors/err-code"

import type { RegisterInput, LoginInput} from "./auth.schema"
var jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key"

export const AuthService = {
     async register(input: RegisterInput){
          // check email exists
          const existingUser = await AuthRepo.findUserByEmail({
               email: input.email,
          })

          if(existingUser){
               throw new APIError(
                    ErrCode.BadRequest, "Email already in user!"
               )
          }

          // hash password
          const passwordHash = await bcrypt.hash(input.password, 10)
          const [user] = await AuthRepo.createUser({
               email: input.email,
               passwordHash,
             });

          // create organization
          const [organization] = await AuthRepo.createOrganization({
               name: input.organizationName
          })

          // add organization member
          await AuthRepo.addOrganizationMember({
               userId: user.id,
               organizationId: organization.id,
               role: "admin",
          })

          return {
               userId: user.id,
               organizationId: organization.id
          }

     },

     async login(input: LoginInput){
          const [user] = await AuthRepo.findUserByEmail({
               email: input.email,
          })

          if(!user){
               throw new APIError(
                    ErrCode.Unauthenticated, "Invalid email or credentials!"
               )
          }

          const isPasswordValid = await bcrypt.compare(
               input.password,
               user.passwordHash,
          )

          if(!isPasswordValid){
               throw new APIError(
                    ErrCode.BadRequest,"Invalid email or password!"
               )
          }

          // sign in token
          const token = jwt.sign(
               {
                    userId: user.id,
               },
               JWT_SECRET,
               {
                    expiresIn: "7d",
               }
          )

          return user;


     }
}
// auth api, export endpoint
//    - `POST /v1/auth/register` - User registration
//    - `POST /v1/auth/login` - User login

import { api } from "encore.dev/api"
import { AuthService } from "./auth.service"
import { LoginSchema, RegisterSchema} from "./auth.schema"
import type { RegisterInput, LoginInput } from "./auth.schema"


//    - `POST /v1/auth/register` - User registration
export const register = api(
     {method: "POST", path: "/v1/auth/register"},
     async(body: RegisterInput) =>{
          // validate
          const input = RegisterSchema.parse(body),
          // call service
          result = await AuthService.register(input)
          return {
               message: "Registration successful",
               data: result
          }
     }
)

//    - `POST /v1/auth/login` - User login
export const login = api(
     {method: "POST", path: "/v1/auth/login"},
     async( body: LoginInput) =>{
          // validate
          const input = LoginSchema.parse(body),
          // call service
          result =  await AuthService.login(input)
          return {
               message: "Login successful",
               data: result
          }
     }
)

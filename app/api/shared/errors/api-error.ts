import {ErrCode} from "./err-code"

export class APIError extends Error{
     code: ErrCode;
     status: number;

     constructor(code: ErrCode, message: string){
          super(message);
          this.code = code,
          this.status = mapStatusCode(code);
     }
}
     function mapStatusCode(code: ErrCode): number{
          switch(code){
               case ErrCode.BadRequest:
                    return 400;
               case ErrCode.Unauthenticated:
                    return 401;
               case ErrCode.Forbidden:
                    return 403;
               case ErrCode.NotFound:
                    return 404;
               case ErrCode.InternalError:
                    return 500;
               default:
                    return 500;
               
          }
     }

import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }
  
    handleRequest(err, user, info) {    
  
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      if(user.delete==1){
        console.log("delete")
        throw new UnauthorizedException();
      }
      return user;
    }
  }
  
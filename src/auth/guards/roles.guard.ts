import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';
import { RolesService } from '../../roles/roles.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector ,
    private readonly usersService: UsersService,
) {}

async  canActivate(context: ExecutionContext): Promise<any> {
  
    const request = context.switchToHttp().getRequest();

    const user = request.user;
   let   userr=null;
  return this.getRole(user.id).then(function(result) {
    if(result.role.name){
      userr=result.role.name;
     
return true;
    }else{
       false;
    }
    
  
 })



   
   
    
    // user 
    // && hasRole==true;
   //  && user.roles;
    //  ;
  }
   getRole(id:any){
     return( this.usersService.findOneUserBYrole(id).then((result) => result));
  }
}
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';
// import {RolesService} from '../../roles/roles.service';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector ,
    private readonly usersService: UsersService,
    // private readonly rolesService: RolesService
) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('permissions', context.getHandler());
   
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    
    const user = request.user;
   let   userr=null;
   
  const  getRol= this.getRole(user.id)
  getRol.then(function(result) {
  
  return 
  // this.getPermissionsByRole()
  userr=result.role.name;
 })



    // const hasRole = () => user.roles.some((role) => !!roles.find((item) => item === role));
    return user ;
   // && user.roles;
    //  && hasRole();
  }
   getRole(id:any){
     return( this.usersService.findOneUserBYrole(id).then((result) => result));
  }
  // getPermissionsByRole(id:any){
  //   return (this.rolesService.getRolebyPermissions(id).then((result) => result))
  // }
}
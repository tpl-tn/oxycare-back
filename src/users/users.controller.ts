import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
@ApiTags('admin')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
        ){}
    @Get('Users')
  @UseGuards(AuthGuard())
  findAllUser(@Res() res): Promise<any>  {
    return this.usersService
      .findUsers()
      .then(data =>
        
       {
        return res.status(HttpStatus.OK).json(data); 
       } )
       .catch(erreur => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'BAD_REQUEST' });
      });
  }
}

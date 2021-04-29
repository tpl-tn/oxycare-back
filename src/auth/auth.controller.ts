import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    HttpStatus,
    Param,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { User } from '../users/user.entity';
  import { UsersService } from '../users/users.service';
 
  import {
    ApiTags,
    ApiParam,
    ApiBody,
    ApiResponse,
  } from '@nestjs/swagger';

  import { Any } from '../../node_modules/typeorm';
  import { ResetPasswordDto } from './dto/reset-password.dto';

  @ApiTags('auth')
  @Controller()
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService,

    ) {}
  
    @Post('login')
    async loginUser(@Res() res, @Body() body: User): Promise<any> {
      console.log('login');
      if (!body && body.email && body.password) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'Email and password are required!' });
      }
  
      const user = await this.usersService.findOneByEmail(body.email);
  
      if (user) {
        if (user.status == 1) {
          if (await this.usersService.compareHash(body.password, user.password)) {
           
         
          
              return res
                .status(HttpStatus.OK)
                .json(
                  await this.authService.createToken(user)
                );
           
          
        } else {
          return res
            .status(HttpStatus.FORBIDDEN)
            .json({ success: 0, message: 'compte d actif !' });
        }
      }
  
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'Email or password wrong!' });
    }}
  
    @Post('facebookLogin')
    async loginUserfb(@Res() res, @Body() body: User): Promise<any> {
      console.log('body', body);
      if (!body || !body.TokenFb || !body.idFb) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: ' fuck login !', success: -1 });
      }
  
      const user = await this.usersService.findOneByidFb(body.idFb);
  
      if (user) {
     
       
        return await this.usersService.saveOrUpdateUser(user)
          .then(r => {
            return this.authService.createToken(user)
              .then(result => {
                return res.status(HttpStatus.OK).json(result);
              })
              .catch(error => {
                return res
                  .status(HttpStatus.BAD_REQUEST)
                  .json({ message: 'Error Generating Token' });
              });
          })
          .catch(erreur => {
            return res
              .status(HttpStatus.BAD_REQUEST)
              .json({ message: 'user' });
          });
      } else {
        const userEmail = await this.usersService.findOneByEmail(body.email);
        if (userEmail) {
        
              userEmail.idFb = body.idFb;
              userEmail.TokenFb = body.TokenFb;
              return this.usersService
                .saveUserFb(userEmail)
                .then(resp => {
                  return this.authService.createToken(resp)
                    .then(result => {
                      return res.status(HttpStatus.OK).json(result);
                    })
                    .catch(error => {
                      return res
                        .status(HttpStatus.BAD_REQUEST)
                        .json({ message: 'Error Generating Token' });
                    });
                })
              
          
        } else {
          return res
            .status(HttpStatus.FORBIDDEN)
            .json({ message: 'Login failed!', success: 0 });
        }
      }
    }
  
    @Post('googleLogin')
    async loginUserGoogle(@Res() res, @Body() body: User): Promise<any> {
      if (!body || !body.idGoogle || !body.TokenGoogle) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: ' fuck login !', success: -1 });
      }
      const user = await this.usersService.findOneByidGoogle(body.idGoogle);
      if (user) {
      
     
     
    
          return this.authService.createToken(user)
         
            .then(tok => {
              return res.status(HttpStatus.OK).json(tok);
            });
      
      } else {
              return res
                .status(HttpStatus.FORBIDDEN)
                .json({ message: 'Login failed!', success: 0 });
            }
       
  
       
      
    }
    @ApiBody({  type: User, required: true })
    @Post('register')
    async registerUser(@Res() res, @Body() user: any): Promise<any> {
      return this.usersService
        .saveOrUpdateUser(user)
        .then(async resp => {
            return await this.authService.createToken(resp)
              .then(response => {
                console.log('response re', response);
  
                return res.status(HttpStatus.OK).json({ response, status: 1 });
              })
              .catch(error => {
                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .json({ error, status: 0 }),
                  console.log(error);
              });
          }).catch(error => {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ error, status: 0 }),
              console.log(error);
          });
        
    }
  
    @Post('registerfb')
    async registerUserFb(@Res() res, @Body() user: User): Promise<any> {
      if (user.idFb != null) {
        return this.usersService
          .findOneByidFb(user.idFb)
          .then(result => {
            if (result) {
              res
                .status(HttpStatus.BAD_REQUEST)
                .json({ success: 0, message: 'this user existe' });
            } else {
              return this.usersService.findOneByEmail(user.email).then(result => {
                if (result) {
                  res
                    .status(HttpStatus.OK)
                    .json({ success: 1 }, this.authService.createToken(result));
                  // res.status(HttpStatus.OK).json({ success: 1, message: 'update' });
                } else {
                  return this.usersService.saveUserFb(user).then(result => {
                    res
                      .status(HttpStatus.OK)
                      .json({ success: 1 }, this.authService.createToken(result));
                  });
                }
              });
            }
          })
          .catch(error => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error),
              console.log(error);
          });
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: 0, message: 'bad request' });
      }
    }
    @ApiBody({  type: Any, required: true })
    @Post('findEmail')
    async findEmail(@Body() email: any, @Res() res): Promise<any> {
      if (email.email != null) {
        return this.usersService
          .findOneByEmail(email.email)
          .then(result => {
            if (result) {
              res
                .status(HttpStatus.BAD_REQUEST)
                .json({ success: 1, message: 'email  exist' });
            } else {
              res
                .status(HttpStatus.BAD_REQUEST)
                .json({ success: 0, message: 'email not exist' });
            }
          })
          .catch(error => {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .json({ success: 0, error });
          });
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: -1, message: 'BAD_REQUEST' });
      }
    }
  
    // @ApiParam({ name: 'email', required: true })
    // @Get('auth/:email')
    // async sendEmail(@Param() email: any, @Res() res): Promise<any> {
    //   this.usersService
    //     .findOneByEmail(email.email)
    //     .then(result => {
    //       if (result) {
    //         return this.authService
    //           .sendEmailForgotPassword(result)
    //           .then(async response => {
    //             console.log('rep', response);
    //             if (response == true) {
    //               return res.status(HttpStatus.OK).json({ success: 1 });
    //             }
    //             if (response == false) {
    //               return res
    //                 .status(HttpStatus.OK)
    //                 .json({ success: -1, message: '1 jour' });
    //             }
    //           })
    //           .catch(error => {
    //             res
    //               .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //               .json({ success: 0, error }),
    //               console.log(error);
    //           });
    //       } else {
    //         res
    //           .status(HttpStatus.BAD_REQUEST)
    //           .json({ success: 0, message: 'email not exist' });
    //       }
    //     })
    //     .catch(error => {
    //       res
    //         .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //         .json({ success: 0, error }),
    //         console.log(error);
    //     });
    // }
  
    // @ApiParam({ name: 'email', required: true })
    // @Get('envoyerconfirmation/:email')
    // async sendEmailConfirmation(@Param() email: any, @Res() res): Promise<any> {
    //   this.usersService
    //     .findOneByEmail(email.email)
    //     .then(result => {
    //       if (result) {
    //         return this.authService
    //           .sendEmailconfirmation(result)
    //           .then(async response => {
    //             return res.status(HttpStatus.OK).json({ success: 1 });
    //           })
    //           .catch(error => {
    //             res
    //               .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //               .json({ success: 0, error }),
    //               console.log(error);
    //           });
    //       } else {
    //         res
    //           .status(HttpStatus.BAD_REQUEST)
    //           .json({ success: 0, message: 'email not exist' });
    //       }
    //     })
    //     .catch(error => {
    //       res
    //         .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //         .json({ success: 0, error }),
    //         console.log(error);
    //     });
    // }
  
    // @Get('auth/confirme/:code')
    // async confirme(@Param() code: any, @Res() res): Promise<any> {
    //   return this.authService
    //     .verifierToken(code.code)
    //     .then(result => {
    //       res.status(HttpStatus.OK).json({ success: 1, data: result });
    //     })
    //     .catch(error => {
    //       res.status(HttpStatus.BAD_REQUEST).json({ success: 0, error });
    //     });
    //   // return   res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:1,  code})
    // }
    // @ApiBody({ name: 'body', type: ResetPasswordDto, required: true })
    // @Post('auth/email/reset-password')
    // async setNewPassord(
    //   @Body() body: ResetPasswordDto,
    //   @Res() res,
    // ): Promise<any> {
    //   console.log('body', body);
  
    //   try {
    //     const userEmail = await this.usersService.findOneByEmail(body.email);
    //     if (userEmail) {
    //       let lastcode = await this.tokenForgotPasswordService.getLastTokenByUser(
    //         userEmail.id,
    //       );
    //       if (lastcode) {
    //         if (lastcode.code == body.newPasswordToken) {
    //           userEmail.password = body.newPassword;
    //           return this.usersService
    //             .saveOrUpdateUser(userEmail)
    //             .then(async response => {
    //               return await this.tokenForgotPasswordService
    //                 .deleteTokenById(lastcode.id)
    //                 .then(re => {
    //                   return res
    //                     .status(HttpStatus.OK)
    //                     .json({ success: 1, message: 'success', response });
    //                 })
    //                 .catch(error => {
    //                   return res
    //                     .status(HttpStatus.FORBIDDEN)
    //                     .json({ success: 0, erreur: error });
    //                 });
    //             })
    //             .catch(error => {
    //               res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error),
    //                 console.log(error);
    //             });
    //         } else {
    //           return res
    //             .status(HttpStatus.OK)
    //             .json({ success: 0, message: 'invalid email ou code' });
    //         }
    //       } else {
    //         return res
    //           .status(HttpStatus.OK)
    //           .json({ success: 0, message: 'invalid email ou code' });
    //       }
    //     } else {
    //       return res
    //         .status(HttpStatus.OK)
    //         .json({ success: 0, message: 'invalid email ou code' });
    //     }
    //   } catch (error) {
    //     return res
    //       .status(HttpStatus.BAD_REQUEST)
    //       .json({ success: -1, message: 'erreuur' });
    //   }
    // }
  }
  
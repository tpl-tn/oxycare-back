import { Module } from '@nestjs/common';
//import { AuthController } from './auth.controller';
import { HttpStrategy } from './http.strateg';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';

import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 36000000,
      },
    }),
    UsersModule,

    RolesModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesService],
  exports: [AuthService],
})
export class AuthModule {}

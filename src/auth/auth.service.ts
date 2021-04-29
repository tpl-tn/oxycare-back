import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtPayloadd } from './interfaces/jwt-payload.interface';
import * as nodemailer from 'nodemailer';

import { default as config } from '../config';

import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(data): Promise<any> {
    const user: JwtPayload = { email: data.email };
    const accessToken = this.jwtService.sign(user);
    delete data.password;
    delete data.idFb;
    delete data.TokenFb;
    delete data.idGoogle;
    delete data.TokenGoogle;
    delete data.status;
    delete data.delete;
    delete data.confirme;
    delete data.macID;
    delete data.id;
    return {
      expiredIn: 36000000,
      accessToken,
      user: data,
    };
  }
  async createTokenAndDevice(data, device): Promise<any> {
    const user: JwtPayloadd = { email: data.email, device: device };
    const accessToken = this.jwtService.sign(user);
    delete data.password;
    delete data.idFb;
    delete data.TokenFb;
    delete data.idGoogle;
    delete data.TokenGoogle;
    delete data.status;
    delete data.delete;
    delete data.confirme;
    delete data.macID;
    delete data.id;
    return {
      expiredIn: 36000000,
      accessToken,
      user: data,
      device: device,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }

}
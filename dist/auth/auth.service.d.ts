import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    createToken(data: any): Promise<any>;
    createTokenAndDevice(data: any, device: any): Promise<any>;
    validateUser(payload: JwtPayload): Promise<any>;
}

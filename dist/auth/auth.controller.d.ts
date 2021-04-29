import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    loginUser(res: any, body: User): Promise<any>;
    loginUserfb(res: any, body: User): Promise<any>;
    loginUserGoogle(res: any, body: User): Promise<any>;
    registerUser(res: any, user: any): Promise<any>;
    registerUserFb(res: any, user: User): Promise<any>;
    findEmail(email: any, res: any): Promise<any>;
}

import { AuthService } from './auth.service';
declare const HttpStrategy_base: new (...args: any[]) => any;
export declare class HttpStrategy extends HttpStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
}
export {};

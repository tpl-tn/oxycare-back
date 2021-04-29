"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async createToken(data) {
        const user = { email: data.email };
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
    async createTokenAndDevice(data, device) {
        const user = { email: data.email, device: device };
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
    async validateUser(payload) {
        return await this.usersService.findOneByEmail(payload.email);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
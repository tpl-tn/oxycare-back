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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("../users/user.entity");
const users_service_1 = require("../users/users.service");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("../../node_modules/typeorm");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async loginUser(res, body) {
        console.log('login');
        if (!body && body.email && body.password) {
            return res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ message: 'Email and password are required!' });
        }
        const user = await this.usersService.findOneByEmail(body.email);
        if (user) {
            if (user.status == 1) {
                if (await this.usersService.compareHash(body.password, user.password)) {
                    return res
                        .status(common_1.HttpStatus.OK)
                        .json(await this.authService.createToken(user));
                }
                else {
                    return res
                        .status(common_1.HttpStatus.FORBIDDEN)
                        .json({ success: 0, message: 'compte d actif !' });
                }
            }
            return res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ message: 'Email or password wrong!' });
        }
    }
    async loginUserfb(res, body) {
        console.log('body', body);
        if (!body || !body.TokenFb || !body.idFb) {
            return res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ message: ' fuck login !', success: -1 });
        }
        const user = await this.usersService.findOneByidFb(body.idFb);
        if (user) {
            return await this.usersService.saveOrUpdateUser(user)
                .then(r => {
                return this.authService.createToken(user)
                    .then(result => {
                    return res.status(common_1.HttpStatus.OK).json(result);
                })
                    .catch(error => {
                    return res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json({ message: 'Error Generating Token' });
                });
            })
                .catch(erreur => {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({ message: 'user' });
            });
        }
        else {
            const userEmail = await this.usersService.findOneByEmail(body.email);
            if (userEmail) {
                userEmail.idFb = body.idFb;
                userEmail.TokenFb = body.TokenFb;
                return this.usersService
                    .saveUserFb(userEmail)
                    .then(resp => {
                    return this.authService.createToken(resp)
                        .then(result => {
                        return res.status(common_1.HttpStatus.OK).json(result);
                    })
                        .catch(error => {
                        return res
                            .status(common_1.HttpStatus.BAD_REQUEST)
                            .json({ message: 'Error Generating Token' });
                    });
                });
            }
            else {
                return res
                    .status(common_1.HttpStatus.FORBIDDEN)
                    .json({ message: 'Login failed!', success: 0 });
            }
        }
    }
    async loginUserGoogle(res, body) {
        if (!body || !body.idGoogle || !body.TokenGoogle) {
            return res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ message: ' fuck login !', success: -1 });
        }
        const user = await this.usersService.findOneByidGoogle(body.idGoogle);
        if (user) {
            return this.authService.createToken(user)
                .then(tok => {
                return res.status(common_1.HttpStatus.OK).json(tok);
            });
        }
        else {
            return res
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ message: 'Login failed!', success: 0 });
        }
    }
    async registerUser(res, user) {
        return this.usersService
            .saveOrUpdateUser(user)
            .then(async (resp) => {
            return await this.authService.createToken(resp)
                .then(response => {
                console.log('response re', response);
                return res.status(common_1.HttpStatus.OK).json({ response, status: 1 });
            })
                .catch(error => {
                res
                    .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ error, status: 0 }),
                    console.log(error);
            });
        }).catch(error => {
            res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error, status: 0 }),
                console.log(error);
        });
    }
    async registerUserFb(res, user) {
        if (user.idFb != null) {
            return this.usersService
                .findOneByidFb(user.idFb)
                .then(result => {
                if (result) {
                    res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json({ success: 0, message: 'this user existe' });
                }
                else {
                    return this.usersService.findOneByEmail(user.email).then(result => {
                        if (result) {
                            res
                                .status(common_1.HttpStatus.OK)
                                .json({ success: 1 }, this.authService.createToken(result));
                        }
                        else {
                            return this.usersService.saveUserFb(user).then(result => {
                                res
                                    .status(common_1.HttpStatus.OK)
                                    .json({ success: 1 }, this.authService.createToken(result));
                            });
                        }
                    });
                }
            })
                .catch(error => {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(error),
                    console.log(error);
            });
        }
        else {
            res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ success: 0, message: 'bad request' });
        }
    }
    async findEmail(email, res) {
        if (email.email != null) {
            return this.usersService
                .findOneByEmail(email.email)
                .then(result => {
                if (result) {
                    res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json({ success: 1, message: 'email  exist' });
                }
                else {
                    res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json({ success: 0, message: 'email not exist' });
                }
            })
                .catch(error => {
                res
                    .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ success: 0, error });
            });
        }
        else {
            res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ success: -1, message: 'BAD_REQUEST' });
        }
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    common_1.Post('facebookLogin'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUserfb", null);
__decorate([
    common_1.Post('googleLogin'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUserGoogle", null);
__decorate([
    swagger_1.ApiBody({ type: user_entity_1.User, required: true }),
    common_1.Post('register'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    common_1.Post('registerfb'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUserFb", null);
__decorate([
    swagger_1.ApiBody({ type: typeorm_1.Any, required: true }),
    common_1.Post('findEmail'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findEmail", null);
AuthController = __decorate([
    swagger_1.ApiTags('auth'),
    common_1.Controller(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
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
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const users_service_1 = require("../../users/users.service");
let PermissionGuard = class PermissionGuard {
    constructor(reflector, usersService) {
        this.reflector = reflector;
        this.usersService = usersService;
    }
    canActivate(context) {
        const roles = this.reflector.get('permissions', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        let userr = null;
        const getRol = this.getRole(user.id);
        getRol.then(function (result) {
            return;
            userr = result.role.name;
        });
        return user;
    }
    getRole(id) {
        return (this.usersService.findOneUserBYrole(id).then((result) => result));
    }
};
PermissionGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector,
        users_service_1.UsersService])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=permissions.guard.js.map
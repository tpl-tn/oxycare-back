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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../users/user.entity");
let Role = class Role {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false, type: String }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false, type: String, maxLength: 500 }),
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_entity_1.User, user => user.role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
Role = __decorate([
    typeorm_1.Entity()
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map
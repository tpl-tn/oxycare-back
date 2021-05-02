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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const role_entity_1 = require("../roles/role.entity");
const swagger_1 = require("@nestjs/swagger");
const oxygen_entity_1 = require("../oxygene/oxygen.entity");
let User = class User {
    constructor(partial) {
        Object.assign(this, partial);
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ required: true, maxLength: 20 }),
    typeorm_1.Column({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiProperty({ required: true, maxLength: 20 }),
    typeorm_1.Column({ length: 20 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiProperty({ required: true }),
    typeorm_1.Column({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], User.prototype, "time", void 0);
__decorate([
    typeorm_1.ManyToOne(type => role_entity_1.Role),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToMany(type => oxygen_entity_1.Oxygene, oxygene => oxygene.user),
    __metadata("design:type", Array)
], User.prototype, "oxygenes", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ length: 100, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "idFb", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ length: 200, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "TokenFb", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ length: 100, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "idGoogle", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "TokenGoogle", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "delete", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "confirme", void 0);
__decorate([
    swagger_1.ApiProperty({}),
    typeorm_1.Column(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], User.prototype, "fullName", null);
User = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map
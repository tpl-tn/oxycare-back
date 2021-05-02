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
exports.Oxygene = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../users/user.entity");
let Oxygene = class Oxygene {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Oxygene.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false, type: String, maxLength: 500 }),
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Oxygene.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false, type: String, maxLength: 500 }),
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Oxygene.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false, type: String, maxLength: 500 }),
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Oxygene.prototype, "longitude", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false, type: String, maxLength: 500 }),
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Oxygene.prototype, "prixJour", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false, type: typeorm_1.Double, maxLength: 500 }),
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Oxygene.prototype, "prixSemaine", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false, type: typeorm_1.Double, maxLength: 500 }),
    typeorm_1.Column({ length: 500, nullable: true }),
    __metadata("design:type", String)
], Oxygene.prototype, "prixMoi", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ length: 50 }),
    __metadata("design:type", String)
], Oxygene.prototype, "phoneNumber", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Oxygene.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Oxygene.prototype, "delete", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Oxygene.prototype, "confirme", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Oxygene.prototype, "user", void 0);
Oxygene = __decorate([
    typeorm_1.Entity()
], Oxygene);
exports.Oxygene = Oxygene;
//# sourceMappingURL=oxygen.entity.js.map
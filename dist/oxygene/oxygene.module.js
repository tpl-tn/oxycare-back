"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OxygeneModule = void 0;
const common_1 = require("@nestjs/common");
const oxygene_service_1 = require("./oxygene.service");
const oxygene_controller_1 = require("./oxygene.controller");
const typeorm_1 = require("@nestjs/typeorm");
const oxygen_entity_1 = require("./oxygen.entity");
const passport_1 = require("@nestjs/passport");
let OxygeneModule = class OxygeneModule {
};
OxygeneModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([oxygen_entity_1.Oxygene]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: true }),
        ],
        providers: [oxygene_service_1.OxygeneService],
        controllers: [oxygene_controller_1.OxygeneController],
        exports: [oxygene_service_1.OxygeneService],
    })
], OxygeneModule);
exports.OxygeneModule = OxygeneModule;
//# sourceMappingURL=oxygene.module.js.map
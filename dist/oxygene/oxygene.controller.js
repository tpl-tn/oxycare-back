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
exports.OxygeneController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const oxygen_entity_1 = require("./oxygen.entity");
const oxygene_service_1 = require("./oxygene.service");
let OxygeneController = class OxygeneController {
    constructor(oxygeneService) {
        this.oxygeneService = oxygeneService;
    }
    findAllOxygene(res) {
        return this.oxygeneService.findAllOxygene()
            .then(data => {
            return res.status(common_1.HttpStatus.OK).json(data);
        })
            .catch(erreur => {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'BAD_REQUEST' });
        });
    }
    addOxygene(req, res, body) {
        const idU = req.user.id;
        body.user = idU;
        return this.oxygeneService.saveOrUpdateOxygene(body)
            .then(data => {
            return res.status(common_1.HttpStatus.OK).json(data);
        })
            .catch(erreur => {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'BAD_REQUEST' });
        });
    }
    deleteOygene(res) {
        return this.oxygeneService.findAllOxygene()
            .then(data => {
            return res.status(common_1.HttpStatus.OK).json(data);
        })
            .catch(erreur => {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'BAD_REQUEST' });
        });
    }
    editOygene(res) {
        return this.oxygeneService.findAllOxygene()
            .then(data => {
            return res.status(common_1.HttpStatus.OK).json(data);
        })
            .catch(erreur => {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'BAD_REQUEST' });
        });
    }
};
__decorate([
    common_1.Get(''),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OxygeneController.prototype, "findAllOxygene", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Post('add'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, oxygen_entity_1.Oxygene]),
    __metadata("design:returntype", Promise)
], OxygeneController.prototype, "addOxygene", null);
__decorate([
    common_1.Delete(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OxygeneController.prototype, "deleteOygene", null);
__decorate([
    common_1.Put(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OxygeneController.prototype, "editOygene", null);
OxygeneController = __decorate([
    swagger_1.ApiTags('oxygene'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('oxygene'),
    __metadata("design:paramtypes", [oxygene_service_1.OxygeneService])
], OxygeneController);
exports.OxygeneController = OxygeneController;
//# sourceMappingURL=oxygene.controller.js.map
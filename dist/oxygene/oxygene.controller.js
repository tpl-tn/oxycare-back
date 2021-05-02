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
    deleteOygene(res, id) {
        return this.oxygeneService.delete(id)
            .then(data => {
            res.status(common_1.HttpStatus.OK).json({ data });
        })
            .catch(erreur => {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: `Une erreur c'est produit lors de supression de matière.\nErreur: ${erreur}`,
            });
        });
    }
    editOygene(res, id, oxygene) {
        return this.oxygeneService
            .findOneOxygene(id)
            .then(response => {
            if (response) {
                return this.oxygeneService.
                    saveOrUpdateOxygene(response)
                    .then(result => res
                    .status(common_1.HttpStatus.OK)
                    .json({ message: 'Oxygene modifié avec succès', result }))
                    .catch(error => res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: `Une erreur c'est produit lors de modification de oxygene.\nErreur: ${error}`,
                }));
            }
            else {
                return res
                    .status(common_1.HttpStatus.NOT_FOUND)
                    .json({ error: `Oxygene inexistante` });
            }
        })
            .catch(error => res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: `Une erreur c'est produit lors de récupération de Oxygene.\nErreur: ${error}`,
        }));
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
    swagger_1.ApiBody({
        type: oxygen_entity_1.Oxygene,
        required: true,
    }),
    common_1.Post('add'),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, oxygen_entity_1.Oxygene]),
    __metadata("design:returntype", Promise)
], OxygeneController.prototype, "addOxygene", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiParam({ name: 'id', type: 'number', required: true }),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OxygeneController.prototype, "deleteOygene", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiParam({ name: 'id', type: 'number', required: true }),
    swagger_1.ApiBody({
        type: oxygen_entity_1.Oxygene,
        required: true,
    }),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, oxygen_entity_1.Oxygene]),
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
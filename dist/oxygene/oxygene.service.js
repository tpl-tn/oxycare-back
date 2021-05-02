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
exports.OxygeneService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const oxygen_entity_1 = require("./oxygen.entity");
let OxygeneService = class OxygeneService {
    constructor(oxygeneRepository) {
        this.oxygeneRepository = oxygeneRepository;
    }
    async findAllOxygene() {
        return this.oxygeneRepository.find();
    }
    async saveOrUpdateOxygene(oxygene) {
        return await this.oxygeneRepository.save(oxygene);
    }
    async delete(id) {
        return await this.findOneOxygene(id).then(response => {
            if (response) {
                let response2 = response;
                if (response.delete == 0) {
                    response2.delete = 1;
                }
                return this.oxygeneRepository
                    .save(response2)
                    .then(async () => {
                    return await this.findOneOxygene(response.id)
                        .then(response => response)
                        .catch(error => error);
                })
                    .catch(error => error);
            }
        });
    }
    async findOneOxygene(id) {
        return await this.oxygeneRepository.findOne(id);
    }
    async deactivateUser(id) {
        return await this.findOneOxygene(id).then(response => {
            if (response) {
                let response2 = response;
                if (response.status == 0) {
                    response2.status = 1;
                }
                else {
                    response2.status = 0;
                }
                return this.oxygeneRepository
                    .save(response2)
                    .then(async () => {
                    return await this.findOneOxygene(response.id)
                        .then(response => response)
                        .catch(error => error);
                })
                    .catch(error => error);
            }
        });
    }
    async ConfirmerOxygene(id) {
        return await this.findOneOxygene(id).then(response => {
            if (response) {
                let response2 = response;
                response2.confirme = 1;
                return this.oxygeneRepository
                    .save(response2)
                    .then(async () => {
                    return await this.findOneOxygene(response.id)
                        .then(response => response)
                        .catch(error => error);
                })
                    .catch(error => error);
            }
        });
    }
};
OxygeneService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(oxygen_entity_1.Oxygene)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OxygeneService);
exports.OxygeneService = OxygeneService;
//# sourceMappingURL=oxygene.service.js.map
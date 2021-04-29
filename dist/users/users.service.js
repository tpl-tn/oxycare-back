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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.saltRounds = 10;
    }
    async findOneByEmail(email) {
        console.log('email:', email);
        return this.usersRepository
            .createQueryBuilder('user')
            .where('user.email=:email')
            .setParameter('email', email)
            .getOne();
    }
    async findOneByidFb(idFb) {
        return this.usersRepository
            .createQueryBuilder('user')
            .where('user.idFb=:idFb')
            .setParameter('idFb', idFb)
            .getOne();
    }
    async findOneByidGoogle(idGoogle) {
        return this.usersRepository
            .createQueryBuilder('user')
            .where('user.idGoogle=:idGoogle')
            .setParameter('idGoogle', idGoogle)
            .getOne();
    }
    async findUsers() {
        return await this.usersRepository
            .createQueryBuilder('user')
            .where('user.roleId IS NULL && user.delete=0')
            .getMany();
    }
    async findOneUser(id) {
        return await this.usersRepository.findOne(id);
    }
    async findOneUserBYrole(id) {
        return await this.usersRepository.findOne(id, { relations: ['role'] });
    }
    async findListadmin() {
        return this.usersRepository
            .createQueryBuilder('role')
            .leftJoinAndSelect('role.users', 'user')
            .getMany();
    }
    async getUserLevel(id) {
        return await this.usersRepository.findOne(id, { relations: ['rolle'] });
    }
    async deactivateUser(id) {
        return await this.findOneUser(id).then(response => {
            if (response) {
                let response2 = response;
                if (response.status == 0) {
                    response2.status = 1;
                }
                else {
                    response2.status = 0;
                }
                return this.usersRepository
                    .save(response2)
                    .then(async () => {
                    return await this.findOneUser(response.id)
                        .then(response => response)
                        .catch(error => error);
                })
                    .catch(error => error);
            }
        });
    }
    async changeNameUser(firstName, lastName, id) {
        return await this.findOneUser(id).then(response => {
            if (response) {
                response.firstName = firstName;
                response.lastName = lastName;
                return this.usersRepository
                    .save(response)
                    .then(async () => {
                    return await this.findOneUser(response.id)
                        .then(response => response)
                        .catch(error => error);
                })
                    .catch(error => error);
            }
        });
    }
    async ConfirmerUser(id) {
        return await this.findOneUser(id).then(response => {
            if (response) {
                let response2 = response;
                response2.confirme = 1;
                return this.usersRepository
                    .save(response2)
                    .then(async () => {
                    return await this.findOneUser(response.id)
                        .then(response => response)
                        .catch(error => error);
                })
                    .catch(error => error);
            }
        });
    }
    async delete(id) {
        return await this.findOneUser(id).then(response => {
            if (response) {
                let response2 = response;
                if (response.delete == 0) {
                    response2.delete = 1;
                }
                return this.usersRepository
                    .save(response2)
                    .then(async () => {
                    return await this.findOneUser(response.id)
                        .then(response => response)
                        .catch(error => error);
                })
                    .catch(error => error);
            }
        });
    }
    async getHash(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
    async compareHash(password, hash) {
        return bcrypt.compare(password, hash);
    }
    async saveOrUpdateUser(user) {
        const passwordHash = await this.getHash(user.password);
        user.password = passwordHash;
        return await this.usersRepository.save(user);
    }
    async saveUserFb(user) {
        return await this.usersRepository.save(user);
    }
    async getNumberUser() {
        return await this.usersRepository
            .createQueryBuilder('user')
            .select('COUNT(user.id) AS cnt')
            .where('user.roleId IS NULL')
            .getRawMany();
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
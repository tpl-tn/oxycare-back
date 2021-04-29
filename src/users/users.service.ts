import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Any } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  private saltRounds = 10;
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  //
  async findOneByEmail(email: string): Promise<any> {
    console.log('email:', email);
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.email=:email')
      .setParameter('email', email)
      .getOne();
  }
  async findOneByidFb(idFb: string): Promise<any> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.idFb=:idFb')
      .setParameter('idFb', idFb)
      .getOne();
  }
  async findOneByidGoogle(idGoogle: string): Promise<any> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.idGoogle=:idGoogle')
      .setParameter('idGoogle', idGoogle)
      .getOne();
  }
 

  async findUsers(): Promise<User[]> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.roleId IS NULL && user.delete=0')
      .getMany();
  }

  async findOneUser(id): Promise<User> {
    return await this.usersRepository.findOne(id);
  }
  async findOneUserBYrole(id): Promise<User> {
    return await this.usersRepository.findOne(id, { relations: ['role'] });
  }
  async findListadmin(): Promise<any> {
    return this.usersRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.users', 'user')
      .getMany();
  }

  async getUserLevel(id: any): Promise<any> {
    return await this.usersRepository.findOne(id, { relations: ['rolle'] });
  }

  async deactivateUser(id: any): Promise<any> {
    return await this.findOneUser(id).then(response => {
      if (response) {
        let response2 = response;
        if (response.status == 0) {
          response2.status = 1;
        } else {
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



  async changeNameUser(
    firstName: string,
    lastName: string,
    id: any,
  ): Promise<any> {
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
  async ConfirmerUser(id: any): Promise<any> {
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

  async delete(id: any): Promise<any> {
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


  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async saveOrUpdateUser(user: User): Promise<any> {
    const passwordHash = await this.getHash(user.password);
    user.password = passwordHash;
    return await this.usersRepository.save(user);
  }

  async saveUserFb(user: User): Promise<any> {
    return await this.usersRepository.save(user);
  }
  async getNumberUser(): Promise<any> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .select('COUNT(user.id) AS cnt')
      .where('user.roleId IS NULL')
      .getRawMany();
  }
}

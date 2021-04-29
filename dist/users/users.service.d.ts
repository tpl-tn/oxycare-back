import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly usersRepository;
    private saltRounds;
    constructor(usersRepository: Repository<User>);
    findOneByEmail(email: string): Promise<any>;
    findOneByidFb(idFb: string): Promise<any>;
    findOneByidGoogle(idGoogle: string): Promise<any>;
    findUsers(): Promise<User[]>;
    findOneUser(id: any): Promise<User>;
    findOneUserBYrole(id: any): Promise<User>;
    findListadmin(): Promise<any>;
    getUserLevel(id: any): Promise<any>;
    deactivateUser(id: any): Promise<any>;
    changeNameUser(firstName: string, lastName: string, id: any): Promise<any>;
    ConfirmerUser(id: any): Promise<any>;
    delete(id: any): Promise<any>;
    getHash(password: string | undefined): Promise<string>;
    compareHash(password: string | undefined, hash: string | undefined): Promise<boolean>;
    saveOrUpdateUser(user: User): Promise<any>;
    saveUserFb(user: User): Promise<any>;
    getNumberUser(): Promise<any>;
}

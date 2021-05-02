import { Role } from '../roles/role.entity';
import { Oxygene } from 'src/oxygene/oxygen.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    time: string;
    role: Role;
    oxygenes: Oxygene[];
    phoneNumber: string;
    idFb: string;
    TokenFb: string;
    idGoogle: string;
    TokenGoogle: string;
    status: number;
    delete: number;
    confirme: number;
    password: string;
    get fullName(): string;
    constructor(partial: Partial<User>);
}

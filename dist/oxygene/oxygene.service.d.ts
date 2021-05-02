import { Repository } from 'typeorm';
import { Oxygene } from './oxygen.entity';
export declare class OxygeneService {
    private readonly oxygeneRepository;
    constructor(oxygeneRepository: Repository<Oxygene>);
    findAllOxygene(): Promise<any>;
    saveOrUpdateOxygene(oxygene: Oxygene): Promise<any>;
    delete(id: any): Promise<any>;
    findOneOxygene(id: any): Promise<Oxygene>;
    deactivateUser(id: any): Promise<any>;
    ConfirmerOxygene(id: any): Promise<any>;
}

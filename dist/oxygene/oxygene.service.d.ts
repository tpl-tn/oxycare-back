import { Repository } from 'typeorm';
import { Oxygene } from './oxygen.entity';
export declare class OxygeneService {
    private readonly oxygeneRepository;
    constructor(oxygeneRepository: Repository<Oxygene>);
    findAllOxygene(): Promise<any>;
    saveOrUpdateOxygene(oxygene: Oxygene): Promise<any>;
}

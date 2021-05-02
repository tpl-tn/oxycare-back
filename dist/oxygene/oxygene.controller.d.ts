import { Oxygene } from './oxygen.entity';
import { OxygeneService } from './oxygene.service';
export declare class OxygeneController {
    private readonly oxygeneService;
    constructor(oxygeneService: OxygeneService);
    findAllOxygene(res: any): Promise<Oxygene[]>;
    addOxygene(req: any, res: any, body: Oxygene): Promise<any>;
    deleteOygene(res: any, id: any): Promise<Oxygene>;
    editOygene(res: any, id: any, oxygene: Oxygene): Promise<any>;
}

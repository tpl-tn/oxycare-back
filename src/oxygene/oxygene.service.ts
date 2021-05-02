import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Oxygene } from './oxygen.entity';

@Injectable()
export class OxygeneService {
    constructor(
      @InjectRepository(Oxygene) private readonly oxygeneRepository: Repository<Oxygene>,
    ) {}
    async findAllOxygene(): Promise<any> {
        
        return this.oxygeneRepository.find()
          
      }
      async saveOrUpdateOxygene(oxygene: Oxygene): Promise<any> {
       
       
        return await this.oxygeneRepository.save(oxygene);
      }
    


}

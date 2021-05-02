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
      async delete(id: any): Promise<any> {
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
      async findOneOxygene(id): Promise<Oxygene> {
        return await this.oxygeneRepository.findOne(id);
      }

      async deactivateUser(id: any): Promise<any> {
        return await this.findOneOxygene(id).then(response => {
          if (response) {
            let response2 = response;
            if (response.status == 0) {
              response2.status = 1;
            } else {
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
    
      async ConfirmerOxygene(id: any): Promise<any> {
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

}

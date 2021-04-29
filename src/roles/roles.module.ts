import { Module } from '@nestjs/common';
import {Role} from './role.entity';
import { RolesController} from './roles.controller';
import {RolesService} from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
   
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],

})
export class RolesModule {


}

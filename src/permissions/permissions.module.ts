import { Module } from '@nestjs/common';


import {PermissionsService} from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RolesService} from '../roles/roles.service';

import { RolesModule } from '../roles/roles.module';
@Module({
 
    controllers: [],
    providers: [PermissionsService],
    exports: [],

})
export class PermissionsModule {}

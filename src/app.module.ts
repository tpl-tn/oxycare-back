import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { PermissionsService } from './permissions/permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { OxygeneModule } from './oxygene/oxygene.module';
import { Oxygene } from './oxygene/oxygen.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env',}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User,Role,Oxygene],
      synchronize: true,
    }),
     AuthModule,
    UsersModule,
   
   
    RolesModule,
    PermissionsModule,
    OxygeneModule,],
  controllers: [  AppController,
    RolesController,],
  providers: [  AppService,
    RolesService,
    PermissionsService],
})
export class AppModule {}

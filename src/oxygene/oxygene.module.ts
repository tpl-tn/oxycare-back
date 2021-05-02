import { Module } from '@nestjs/common';
import { OxygeneService } from './oxygene.service';
import { OxygeneController } from './oxygene.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oxygene } from './oxygen.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Oxygene]),
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user', session: true }),
   
  ],
  providers: [OxygeneService],
  controllers: [OxygeneController],
  exports: [OxygeneService],
  
})
export class OxygeneModule {}

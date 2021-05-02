import {Entity,  PrimaryGeneratedColumn, Column, OneToMany, Double, ManyToOne} from 'typeorm';
import {  ApiProperty } from '@nestjs/swagger';
import {User} from '../users/user.entity'
@Entity()
export class Oxygene {
  @PrimaryGeneratedColumn()
  id: number;

 

  @ApiProperty({ required: false, type: String, maxLength: 500 })
  @Column({ length: 500, nullable: true })
  description: string;

  @ApiProperty({ required: false, type: String, maxLength: 500 })
  @Column({ length: 500, nullable: true })
  latitude: String;
  @ApiProperty({ required: false, type: String, maxLength: 500 })
  @Column({ length: 500, nullable: true })
  longitude: String;
  @ApiProperty({ required: false, type: String, maxLength: 500 })
  @Column({ length: 500, nullable: true })
  prixJour: String;
  @ApiProperty({ required: false, type: Double, maxLength: 500 })
  @Column({ length: 500, nullable: true })
  prixSemaine: String;
  @ApiProperty({ required: false, type: Double, maxLength: 500 })
  @Column({ length: 500, nullable: true })
  prixMoi: String;
  @ApiProperty({ required: false })
  @Column({ length: 50 })
  phoneNumber: string;
  @ApiProperty({ required: false })
  @Column({ default:1})
  status: number;
  @ApiProperty({ required: false })
  @Column({ default:0})
  delete: number;
  @ApiProperty({ required: false })
  @Column({ default:0})
  confirme: number;
  @ManyToOne(type => User)
  user: User;



}

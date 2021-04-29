  import {Entity,  PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
  import {  ApiProperty } from '@nestjs/swagger';
  import {User} from '../users/user.entity'
  @Entity()
  export class Role {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ required: false, type: String })
    @Column({ nullable: true })
    name: string;
  
    @ApiProperty({ required: false, type: String, maxLength: 500 })
    @Column({ length: 500, nullable: true })
    description: string;
  
  
  
    @OneToMany(type => User, user => user.role)
    users: User[];
  }
  
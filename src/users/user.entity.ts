import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { Exclude, Expose } from 'class-transformer';


 
  import {Role} from '../roles/role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Oxygene } from 'src/oxygene/oxygen.entity';
 
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ required: true, maxLength: 20 })
    @Column({ length: 20 })
    firstName: string;
  
    @ApiProperty({ required: true, maxLength: 20 })
    @Column({ length: 20 })
    lastName: string;
    
    @ApiProperty({ required: true })
    @Column({ length: 100 })
    email: string;
  
    @ApiProperty({ required: false })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    time: string;
  
  
 
  
  
  

  
   
  
    
    
    

    @ManyToOne(type => Role)
    role: Role;
    @OneToMany(type => Oxygene, oxygene =>  oxygene.user)
    oxygenes: Oxygene[];
  
    
  
    @ApiProperty({ required: false })
    @Column({ length: 50 })
    phoneNumber: string;
  
    
    @ApiProperty({ required: false })
    @Column({ length: 100,nullable: true })
    idFb: string;
  
    @ApiProperty({ required: false })
    @Column({ length: 200, nullable: true })
    TokenFb: string;
  
    @ApiProperty({ required: false })
    @Column({ length: 100,nullable: true })
    idGoogle: string;
  
    @ApiProperty({ required: false })
    @Column({ length: 500, nullable: true })
    TokenGoogle: string;
  
  
    @ApiProperty({ required: false })
    @Column({ default:1})
    status: number;
    @ApiProperty({ required: false })
    @Column({ default:0})
    delete: number;
    @ApiProperty({ required: false })
    @Column({ default:0})
    confirme: number;
  
  
  
  
  
  
    @ApiProperty({})
    @Column()
    @Exclude()
    password: string;
  
  
  

    @Expose()
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  
    constructor(partial: Partial<User>) {
      Object.assign(this, partial);
    }
  }
  
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Work } from 'src/work/entities/work.entity';

@Entity('user_data')
export class UserData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  vin: string;

  @Column('text')
  car_number: string;

  @Column('text')
  fio: string;

  @CreateDateColumn({ type: 'timestamp' })  
  date: Date;

  @OneToMany(() => Work, work => work.userData)
  works: Work[];
}
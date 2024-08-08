import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserData } from 'src/user/entities/user.entity';

@Entity('works')
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  work: string;

  @Column('numeric')
  amount: number;

  @Column('numeric')
  count: number;

  @ManyToOne(() => UserData, userData => userData.works, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_data_id' }) 
  userData: UserData;
}
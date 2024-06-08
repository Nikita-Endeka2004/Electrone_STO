import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  work: string

  @Column()
  amount: number

  @Column()
  count: number

  @ManyToOne(() => User, (user) => user.works)
  @JoinColumn({name: 'user_id'})
  user: User
}

import { Work } from "src/work/entities/work.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  vin: string

  @Column()
  car_number: string

  @Column()
  fio: string

  @OneToMany(() => Work, (work) => work.user, {onDelete: 'CASCADE'})
  works: Work[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("decimal", { precision: 10, scale: 2 })
  balance!: number;
}

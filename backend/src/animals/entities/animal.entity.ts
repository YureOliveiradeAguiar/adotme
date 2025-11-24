import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  breed: string;

  // filhote | adulto | idoso
  @Column()
  ageCategory: string;

  @Column()
  size: string;

  @Column()
  gender: string;

  @Column()
  vaccinated: string;

  @Column()
  neutered: string;

  @Column()
  description: string; 
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Animal {
    @PrimaryGeneratedColumn() // cria uma coluna de ID automática
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    age: number;
}
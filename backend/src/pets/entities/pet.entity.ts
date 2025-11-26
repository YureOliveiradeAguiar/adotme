import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Species, Size, Gender } from '../enums/pet.enums';

@Entity()
export class Pet {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({ type: 'text', enum: Species })
	species: Species;

	@Column()
	breed: string;

	@Column()
	age: number;

	@Column({ type: 'text', enum: Size })
	size: Size;

	@Column({ type: 'text', enum: Gender })
	gender: Gender;
}
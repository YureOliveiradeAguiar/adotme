import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Species, Size, Gender, AgeCategory } from '../enums/pet.enums';

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

	@Column({ type: 'text', enum: AgeCategory })
	ageCategory: AgeCategory;

	@Column({ type: 'text', enum: Size })
	size: Size;

	@Column({ type: 'text', enum: Gender })
	gender: Gender;

	@Column({ default: false })
	vaccinated: boolean;

	@Column({ default: false })
	neutered: boolean;

	@Column({ nullable: true })
	description: string;

	@Column('simple-array', { nullable: true })
	images?: string[];

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

}
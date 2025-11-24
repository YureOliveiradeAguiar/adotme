import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';


@Injectable()
export class AnimalsService {
	private animals = [
		{
			id: 1,
			name: 'Fido',
			type: 'Cachorro',
			breed: 'SRD',
			ageCategory: 'Adulto',
			size: 'Médio',
			gender: 'Macho',
			vaccinated: 'YES',
			neutered: 'YES',
			description: 'Um cachorro muito amigável e cheio de energia.'
		},
		{
			id: 2,
			name: 'Mittens',
			type: 'Gato',
			breed: 'Siamês',
			ageCategory: 'Adulto',
			size: 'Pequeno',
			gender: 'Femea',
			vaccinated: 'YES',
			neutered: 'NO',
			description: 'Gosta de dormir no sol e receber carinho.'
		},
		{
			id: 3,
			name: 'Maquiavel',
			type: 'Dragão',
			breed: 'SRD',
			ageCategory: 'Idoso',
			size: 'Grande',
			gender: 'Macho',
			vaccinated: 'NO',
			neutered: 'NO',
			description: 'Em busca de um humano com muito ouro no jardim.'
		}
	];

	create(createAnimalDto: CreateAnimalDto) {
		return 'This action adds a new animal';
	}

	findAll() {
		return this.animals;
	}

	findOne(id: number) {
		return `This action returns a #${id} animal`;
	}

	update(id: number, updateAnimalDto: UpdateAnimalDto) {
		return `This action updates a #${id} animal`;
	}

	remove(id: number) {
		return `This action removes a #${id} animal`;
	}
}
import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';


@Injectable()
export class AnimalsService {
	private animals = [
		{ id: 1, name: 'Fido', type: 'Dog', age: 3 },
		{ id: 2, name: 'Mittens', type: 'Cat', age: 4 },
		{ id: 3, name: 'Maquiavel', type: 'Dragon', age: 1687 }
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
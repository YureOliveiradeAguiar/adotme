import { Injectable, OnModuleInit } from '@nestjs/common';
import { PetsService } from './pets.service';
import { Species, Size, Gender, AgeCategory } from './enums/pet.enums';

@Injectable()
export class PetsSeed implements OnModuleInit {
    constructor(private readonly petsService: PetsService) { }

    async onModuleInit() {
        const existing = await this.petsService.findAll();
        if (existing.length > 0) {
            console.log('Seed: animais já existem, ignorando...');
            return;
        }

        console.log('Seed: inserindo animais no banco...');

        await this.petsService.create({
            name: 'Rex',
            species: Species.Dog,
            breed: 'SRD',
            ageCategory: AgeCategory.Adulto,
            size: Size.Medium,
            gender: Gender.Male,
            vaccinated: true,
            neutered: true,
            description: 'Muito dócil e brincalhão.'
        });

        await this.petsService.create({
            name: 'Mimi',
            species: Species.Cat,
            breed: 'Persa',
            ageCategory: AgeCategory.Filhote,
            size: Size.Small,
            gender: Gender.Female,
            vaccinated: false,
            neutered: false,
            description: 'Adora carinho e dormir.'
        });

        console.log('Seed: concluído.');
    }
}

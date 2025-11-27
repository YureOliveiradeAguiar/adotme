import { Component } from '@angular/core';
import { Breed, Gender, Pet, Size, Species } from '@models/pets.model';
import { petsObject } from '@models/tests/pets.object';
import { Hero } from './hero/hero';
import { PetCard } from './pet-card/pet-card';

@Component({
	selector: 'page-home',
	templateUrl: './home.html',
	styleUrl: './home.scss',
	imports: [PetCard, Hero]
})
export class Home {
	pets: Pet[] = petsObject.map(p => ({
		...p,
		species: p.species as Species,
		breed: p.breed as Breed,
		size: p.size as Size,
		gender: p.gender as Gender
	}));

	

	//constructor(private animalService: AnimalService) { }
	//ngOnInit() {
	//this.animalService.getAnimals().subscribe({
	//	next: (data) => this.animals = data,
	//	error: (err) => console.error('Erro ao carregar animais:', err)
	//});
	//}
}
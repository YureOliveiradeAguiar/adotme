import { Component } from '@angular/core';
<<<<<<< HEAD
import { Breed, Gender, Pet, PetCard, Size, Species } from './pet-card/pet-card';
import { petsObject } from 'src/assets/objects/pets-object';
=======
import { AnimalService } from '@services/animal.service';
import { Footer } from './footer/footer';
import { Hero } from './hero/hero';
import { PetCard } from './pet-card/pet-card';
import { Header } from '@components/header/header';
>>>>>>> d539e02b1c001049575e06eea01d7d65a07220a8

@Component({
	selector: 'page-home',
	templateUrl: './home.html',
	styleUrl: './home.scss',
<<<<<<< HEAD
	imports: [PetCard]
})
export class Home {
	pets: Pet[] = petsObject.map(p => ({
		...p,
		species: p.species as Species,
		breed: p.breed as Breed,
		size: p.size as Size,
		gender: p.gender as Gender
	}));
=======
	imports: [Header, Hero, PetCard, Footer,]
})
export class Home {
	frodoImage = 'assets/images/frodo.jpg';
>>>>>>> d539e02b1c001049575e06eea01d7d65a07220a8

	//constructor(private animalService: AnimalService) { }
	//ngOnInit() {
	//this.animalService.getAnimals().subscribe({
	//	next: (data) => this.animals = data,
	//	error: (err) => console.error('Erro ao carregar animais:', err)
	//});
	//}
}
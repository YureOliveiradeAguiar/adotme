import { Component } from '@angular/core';
import { Breed, Gender, Pet, PetCard, Size, Species } from './pet-card/pet-card';
import { petsObject } from 'src/assets/objects/pets-object';
import { Hero } from "./hero/hero";
import { Header } from "@components/header/header";
import { Footer } from "./footer/footer";

@Component({
	selector: 'page-home',
	templateUrl: './home.html',
	styleUrl: './home.scss',
	imports: [PetCard, Hero, Header, Footer]
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
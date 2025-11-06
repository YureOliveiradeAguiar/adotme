import { Component } from '@angular/core';
import { AnimalService } from '@services/animal.service';
import { Footer } from './footer/footer';
import { Hero } from './hero/hero';
import { PetCard } from './pet-card/pet-card';
import { Header } from '@components/header/header';

@Component({
	selector: 'page-home',
	templateUrl: './home.html',
	styleUrl: './home.scss',
	imports: [Header, Hero, PetCard, Footer,]
})
export class Home {
	frodoImage = 'assets/images/frodo.jpg';

	animals: any[] = [];

	constructor(private animalService: AnimalService) { }

	ngOnInit() {
		this.animalService.getAnimals().subscribe({
			next: (data) => this.animals = data,
			error: (err) => console.error('Erro ao carregar animais:', err)
		});
	}
}
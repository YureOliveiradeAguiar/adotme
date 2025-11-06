import { Component } from '@angular/core';
import { AnimalCard } from './animal-card/animal-card';

import { AnimalService } from '@services/animal.service';


@Component({
	selector: 'page-home',
	templateUrl: './home.html',
	styleUrl: './home.scss',
	imports: [AnimalCard]
})
export class Home {
	frodoImage = 'assets/images/logo.png';

	animals: any[] = [];

	constructor(private animalService: AnimalService) { }

	ngOnInit() {
		this.animalService.getAnimals().subscribe({
			next: (data) => this.animals = data,
			error: (err) => console.error('Erro ao carregar animais:', err)
		});
	}
}
import { Component, Input } from '@angular/core';


@Component({
	selector: 'home-animal-card',
	imports: [],
	templateUrl: './animal-card.html',
	styleUrl: './animal-card.css'
})
export class AnimalCard {
	@Input() name: string = 'Fido';
	@Input() type: string = 'Cachorro';
	@Input() age: number = 2;
}
import { Component, Input } from '@angular/core';
import { Pet } from '@pages/models/pets.model';

@Component({
  selector: 'home-pet-card',
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
  imports: [],
})
export class PetCard {
  @Input()
  pet!: Pet;

  photoUrl = 'https://placedog.net/500/300?random=' + Math.random();
}
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  ageCategory: string;
  size: string;
  gender: string;
}

@Component({
  selector: 'home-pet-card',
  templateUrl: './pet-card.html',
  styleUrls: ['./pet-card.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class PetCard {
  @Input() pet!: Pet;

  photoUrl = 'https://placedog.net/500/300?random=' + Math.random();

  constructor(private router: Router) { }

  goToDetails() {
    this.router.navigate(['/animals', this.pet.id]);
  }
}

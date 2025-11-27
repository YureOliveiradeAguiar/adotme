import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AnimalService } from '@services/animal.service';

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  ageCategory: string;
  size: string;
  gender: string;
  vaccinated: boolean;
  neutered: boolean;
  description?: string;
  images?: string[];
}

@Component({
  selector: 'home-pet-card',
  templateUrl: './pet-card.html',
  styleUrls: ['./pet-card.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class PetCard implements OnInit {
  @Input() pet!: Pet;

  photoUrl = '';

  constructor(
    private router: Router,
    private animalService: AnimalService
  ) { }

  ngOnInit() {
    // Usa a primeira imagem do pet, ou fallback
    if (this.pet.images && this.pet.images.length > 0) {
      this.photoUrl = this.animalService.getImageUrl(this.pet.images[0]);
    } else {
      this.photoUrl = 'https://placedog.net/500/300?random=' + Math.random();
    }
  }

  goToDetails() {
    this.router.navigate(['/animals', this.pet.id]);
  }
}
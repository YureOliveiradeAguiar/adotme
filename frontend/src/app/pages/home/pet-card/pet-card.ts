import { Component, Input } from '@angular/core';
import { Pet } from '@pages/models/pets.model';
import { IconDog } from "src/assets/icons/icon-dog";

export interface PetTag {
  id: string;
  value: string;
  color: string;
}

@Component({
  selector: 'home-pet-card',
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
  imports: [IconDog],
})
export class PetCard {
  @Input()
  pet!: Pet;

  get petTags(): PetTag[] {
    return [
      { 
        id: 'species',
        value: `${this.pet.species}, ${this.pet.breed || "CDR"}`,
        color: '#AEE2FF'
      },
      { 
        id: 'age',
        value: this.pet.age < 1 ? 'BEBÊ' : 'ADULTO',
        color: '#CFF8D2'
      },
      { 
        id: 'size',
        value: this.pet.size,
        color: '#EBD6FF'
      },
      { 
        id: 'gender', value: this.pet.gender,
        color: '#FFD6B5'
      },
    ];
  }

  photoUrl = 'https://placedog.net/500/300?random=' + Math.random();
}
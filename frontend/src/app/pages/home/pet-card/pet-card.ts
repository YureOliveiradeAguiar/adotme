import { Component, Input } from '@angular/core';

export enum Species {
  Dog = 'DOG',
  Cat = 'CAT',
  Bird = 'BIRD',
  Other = 'OTHER'
}
export enum Breed {
  Labrador = 'LABRADOR',
  Poodle = 'POODLE',
  Persian = 'PERSIAN',
  Mixed = 'MIXED'
}
export enum Size {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE'
}
export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}
export interface Pet {
  name: string;
  species: Species;
  breed: Breed;
  age: number;
  size: Size;
  gender: Gender;
}

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
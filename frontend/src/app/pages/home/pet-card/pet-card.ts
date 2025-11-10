<<<<<<< HEAD
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
=======
import { Component } from '@angular/core';

//==============The Pet Card Component===============
@Component({
  selector: 'app-pet-card',
>>>>>>> d539e02b1c001049575e06eea01d7d65a07220a8
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
  imports: [],
})
export class PetCard {
<<<<<<< HEAD
  @Input()
  pet!: Pet;

  photoUrl = 'https://placedog.net/500/300?random=' + Math.random();
=======
  frodoImage = 'assets/images/frodo.jpg';
>>>>>>> d539e02b1c001049575e06eea01d7d65a07220a8
}
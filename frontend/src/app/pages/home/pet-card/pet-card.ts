import { Component } from '@angular/core';

//==============The Pet Card Component===============
@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.scss',
  imports: [],
})
export class PetCard {
  frodoImage = 'assets/images/frodo.jpg';
}
import { Component } from '@angular/core';
import { Pet, PetCard } from './pet-card/pet-card';
import { Hero } from "./hero/hero";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'page-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [PetCard, Hero, Header, Footer]
})
export class Home {
  pets: Pet[] = [];

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.animalService.getAnimals().subscribe({
      next: (data: Pet[]) => {
        this.pets = data; // agora é direto, sem map
      },
      error: (err) => {
        console.error('Erro ao carregar animais:', err);
      }
    });
  }
}

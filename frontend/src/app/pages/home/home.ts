import { Component } from '@angular/core';
import { Pet, PetCard } from './pet-card/pet-card';
import { Hero } from "./hero/hero";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";
import { AnimalService } from '../../services/animal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  imports: [PetCard, Hero, Header, Footer, CommonModule, FormsModule],
})
export class Home {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];

  filterType: string = '';
  filterSize: string = '';
  filterGender: string = '';
  dropdownOpen: boolean = false;

  constructor(private animalService: AnimalService) { }

  ngOnInit() {
    this.animalService.getAnimals().subscribe({
      next: (data: Pet[]) => {
        this.pets = data;
        this.filteredPets = [...this.pets];
      },
      error: (err) => console.error('Erro ao carregar animais:', err)
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  applyFilters() {
    this.filteredPets = this.pets.filter(pet => {
      const matchesType = !this.filterType || pet.type === this.filterType;
      const matchesSize = !this.filterSize || pet.size === this.filterSize;
      const matchesGender = !this.filterGender || pet.gender === this.filterGender;
      return matchesType && matchesSize && matchesGender;
    });
  }
}

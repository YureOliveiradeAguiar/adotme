import { Component } from '@angular/core';
import { PetCard } from './pet-card/pet-card';
import { Hero } from "./hero/hero";
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";
import { AnimalService } from '../../services/animal.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
}

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

  filterType = '';
  filterSize = '';
  filterGender = '';
  dropdownOpen = false;

  constructor(private animalService: AnimalService) {}

  ngOnInit() {
    this.animalService.getAnimals().subscribe({
      next: (data: any[]) => {
        this.pets = data.map(p => ({
          ...p,
          species: this.translateSpecies(p.species),
          gender: this.translateGender(p.gender),
          size: this.translateSize(p.size),
          ageCategory: this.translateAge(p.ageCategory)
        }));

        this.filteredPets = [...this.pets];
      },
      error: err => console.error('Erro ao carregar animais:', err)
    });
  }

  translateSpecies(v: string) {
    return v === 'DOG' ? 'Cachorro' : 'Gato';
  }

  translateGender(v: string) {
    return v === 'MALE' ? 'Macho' : 'Fêmea';
  }

  translateSize(v: string) {
    return v === 'SMALL' ? 'Pequeno' : v === 'MEDIUM' ? 'Médio' : 'Grande';
  }

  translateAge(v: string) {
    return v === 'FILHOTE' ? 'Filhote' : v === 'ADULTO' ? 'Adulto' : 'Idoso';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  applyFilters() {
    this.filteredPets = this.pets.filter(pet => {
      const matchesType = !this.filterType || pet.species === this.filterType;
      const matchesSize = !this.filterSize || pet.size === this.filterSize;
      const matchesGender = !this.filterGender || pet.gender === this.filterGender;

      return matchesType && matchesSize && matchesGender;
    });
  }

  clearFilters() {
    this.filterType = '';
    this.filterSize = '';
    this.filterGender = '';
    this.applyFilters();
  }
}

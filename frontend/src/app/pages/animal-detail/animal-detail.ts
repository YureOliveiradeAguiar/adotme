import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';

export interface Animal {
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
  selector: 'page-animal-detail',
  templateUrl: './animal-detail.html',
  styleUrls: ['./animal-detail.scss'],
  standalone: true,
  imports: [CommonModule, Header, Footer],
})
export class AnimalDetail implements OnInit {
  pet!: Animal;
  photoUrl = '';

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.animalService.getAnimals().subscribe((animals) => {
      const raw = animals.find(a => a.id === id);

      if (raw) {
        this.pet = {
          ...raw,
          species: this.translateSpecies(raw.species),
          gender: this.translateGender(raw.gender),
          size: this.translateSize(raw.size),
          ageCategory: this.translateAge(raw.ageCategory),
        };

        this.photoUrl = 'https://placedog.net/500/300?random=' + Math.random();
      }
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
}

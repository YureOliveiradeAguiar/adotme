import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';

export interface Animal {
  id?: number;
  name: string;
  type: string;
  breed: string;
  ageCategory: 'filhote' | 'adulto' | 'idoso';
  size: string;
  gender: 'Macho' | 'Femea';
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
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animalService.getAnimals().subscribe((animals) => {
      const found = animals.find((a) => a.id === id);
      if (found) {
        this.pet = found;
        this.photoUrl = 'https://placedog.net/500/300?random=' + Math.random();
      }
    });
  }
}

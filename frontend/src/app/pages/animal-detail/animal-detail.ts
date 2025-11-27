import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimalService, Pet } from '@services/animal.service';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';

@Component({
  selector: 'page-animal-detail',
  templateUrl: './animal-detail.html',
  styleUrls: ['./animal-detail.scss'],
  standalone: true,
  imports: [CommonModule, Header, Footer],
})
export class AnimalDetail implements OnInit {
  pet?: Pet;
  photoUrl = '';

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.animalService.getAnimalById(id).subscribe({
        next: (pet) => {
          this.pet = {
            ...pet,
            species: this.translateSpecies(pet.species),
            gender: this.translateGender(pet.gender),
            size: this.translateSize(pet.size),
            ageCategory: this.translateAge(pet.ageCategory),
          };

          // Usa a primeira imagem do pet
          this.photoUrl = this.animalService.getFirstImageUrl(pet);
        },
        error: (err) => {
          console.error('Erro ao carregar animal:', err);
        }
      });
    }
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
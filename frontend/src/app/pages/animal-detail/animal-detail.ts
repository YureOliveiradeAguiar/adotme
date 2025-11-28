import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimalService, Pet } from '@services/animal.service';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';
import { translator } from '@utils/translators'; 

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
            species: translator.species(pet.species),       
            gender: translator.gender(pet.gender),          
            size: translator.size(pet.size),                
            ageCategory: translator.age(pet.ageCategory),  
          };

          this.photoUrl = this.animalService.getFirstImageUrl(pet);
        },
        error: (err) => {
          console.error('Erro ao carregar animal:', err);
        }
      });
    }
  }

}
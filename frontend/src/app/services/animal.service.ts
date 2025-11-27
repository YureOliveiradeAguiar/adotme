import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  images?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:3000/pets';
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAnimals(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl).pipe(
      map(pets => pets.map(pet => ({
        ...pet,
        // Garante que images seja sempre um array
        images: pet.images && pet.images.length > 0 ? pet.images : ['default-pet.jpg']
      })))
    );
  }

  getAnimalById(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`).pipe(
      map(pet => ({
        ...pet,
        images: pet.images && pet.images.length > 0 ? pet.images : ['default-pet.jpg']
      }))
    );
  }

  // Método para construir a URL da imagem
  getImageUrl(filename: string): string {
    return `${this.baseUrl}/uploads/pets/${filename}`;
  }

  // Método para pegar a primeira imagem do pet
  getFirstImageUrl(pet: Pet): string {
    if (pet.images && pet.images.length > 0) {
      return this.getImageUrl(pet.images[0]);
    }
    return 'https://placedog.net/500/300?random=' + Math.random(); // fallback
  }
}
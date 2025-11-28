import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreatePetRequest {
    name: string;
    species: 'DOG' | 'CAT';
    breed: string;
    ageCategory: 'FILHOTE' | 'ADULTO' | 'IDOSO';
    size: 'SMALL' | 'MEDIUM' | 'LARGE';
    gender: 'MALE' | 'FEMALE';
    vaccinated: boolean;
    neutered: boolean;
    description?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = 'http://localhost:3000/pets';

    constructor(private http: HttpClient) { }

    createPet(petData: CreatePetRequest, images: File[]): Observable<any> {
        const formData = new FormData();

        // Adiciona os dados do pet
        formData.append('name', petData.name);
        formData.append('species', petData.species);
        formData.append('breed', petData.breed);
        formData.append('ageCategory', petData.ageCategory);
        formData.append('size', petData.size);
        formData.append('gender', petData.gender);

        // CORREÇÃO: Converter boolean para string explicitamente
        formData.append('vaccinated', petData.vaccinated.toString());
        formData.append('neutered', petData.neutered.toString());

        if (petData.description) {
            formData.append('description', petData.description);
        }

        // Adiciona as imagens
        images.forEach((image, index) => {
            formData.append('images', image);
        });

        // Debug
        console.log('📤 Enviando para criação:', {
            name: petData.name,
            species: petData.species,
            breed: petData.breed,
            vaccinated: petData.vaccinated,
            neutered: petData.neutered,
            vaccinatedString: petData.vaccinated.toString(),
            neuteredString: petData.neutered.toString()
        });

        return this.http.post(this.apiUrl, formData);
    }

    updatePet(id: string, petData: CreatePetRequest, images: File[]): Observable<any> {
        const formData = new FormData();

        // Adiciona todos os campos do petData
        formData.append('name', petData.name);
        formData.append('species', petData.species);
        formData.append('breed', petData.breed);
        formData.append('ageCategory', petData.ageCategory);
        formData.append('size', petData.size);
        formData.append('gender', petData.gender);

        // CORREÇÃO: Converter boolean para string explicitamente
        formData.append('vaccinated', petData.vaccinated.toString());
        formData.append('neutered', petData.neutered.toString());

        if (petData.description) {
            formData.append('description', petData.description);
        }

        // Adiciona as imagens
        images.forEach((image, index) => {
            formData.append('images', image);
        });

        // Debug
        console.log('📤 Enviando para atualização:', {
            id: id,
            name: petData.name,
            species: petData.species,
            breed: petData.breed,
            vaccinated: petData.vaccinated,
            neutered: petData.neutered,
            vaccinatedString: petData.vaccinated.toString(),
            neuteredString: petData.neutered.toString()
        });

        return this.http.patch(`${this.apiUrl}/${id}`, formData);
    }

    deletePet(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
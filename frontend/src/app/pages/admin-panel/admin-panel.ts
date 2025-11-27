import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";
import { AnimalService } from '@services/animal.service';
import { AdminService, CreatePetRequest } from '@services/admin.service';

interface Pet {
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

@Component({
    selector: 'page-admin-panel',
    templateUrl: './admin-panel.html',
    styleUrls: ['./admin-panel.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, Header, Footer]
})
export class AdminPanel implements OnInit {
    pets: Pet[] = [];
    filteredPets: Pet[] = [];

    // Estados do formulário
    showAddForm = false;
    editingPet: Pet | null = null;

    // Dados do novo pet
    newPet: Partial<CreatePetRequest> = {
        name: '',
        species: 'DOG',
        breed: 'SRD',
        ageCategory: 'FILHOTE',
        size: 'SMALL',
        gender: 'MALE',
        vaccinated: false,
        neutered: false,
        description: 'Um pet amoroso em busca de um novo lar!'
    };

    customBreed = '';
    selectedImages: File[] = [];

    // Filtros
    filterType = '';
    filterSearch = '';

    constructor(
        @Inject(AnimalService) private animalService: AnimalService,
        @Inject(AdminService) private adminService: AdminService
    ) { }

    ngOnInit() {
        this.loadPets();
    }

    loadPets() {
        this.animalService.getAnimals().subscribe({
            next: (data: any[]) => {
                this.pets = data;
                this.filteredPets = [...this.pets];
            },
            error: (err: any) => console.error('Erro ao carregar animais:', err)
        });
    }

    // Método para preview de imagens
    getImageUrl(file: File): string {
        return URL.createObjectURL(file);
    }

    // Métodos do formulário
    startAddPet() {
        this.showAddForm = true;
        this.editingPet = null;
        this.resetForm();
    }

    startEditPet(pet: Pet) {
        this.showAddForm = true;
        this.editingPet = pet;
        this.newPet = {
            name: pet.name,
            species: pet.species as 'DOG' | 'CAT',
            breed: pet.breed,
            ageCategory: pet.ageCategory as 'FILHOTE' | 'ADULTO' | 'IDOSO',
            size: pet.size as 'SMALL' | 'MEDIUM' | 'LARGE',
            gender: pet.gender as 'MALE' | 'FEMALE',
            vaccinated: pet.vaccinated,
            neutered: pet.neutered,
            description: pet.description || 'Um pet amoroso em busca de um novo lar!'
        };

        if (pet.breed !== 'SRD') {
            this.customBreed = pet.breed;
            this.newPet.breed = 'OTHER';
        }

        this.selectedImages = [];
    }

    cancelForm() {
        this.showAddForm = false;
        this.editingPet = null;
        this.resetForm();
    }

    resetForm() {
        this.newPet = {
            name: '',
            species: 'DOG',
            breed: 'SRD',
            ageCategory: 'FILHOTE',
            size: 'SMALL',
            gender: 'MALE',
            vaccinated: false,
            neutered: false,
            description: 'Um pet amoroso em busca de um novo lar!'
        };
        this.customBreed = '';
        this.selectedImages = [];
    }

    onBreedChange() {
        if (this.newPet.breed === 'OTHER') {
            this.newPet.breed = '';
        }
    }

    onImageSelected(event: any) {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            this.selectedImages = Array.from(files);
        }
    }

    removeImage(index: number) {
        // Revogar a URL do objeto antes de remover
        URL.revokeObjectURL(this.getImageUrl(this.selectedImages[index]));
        this.selectedImages.splice(index, 1);
    }

    submitPet() {
        if (!this.newPet.name) {
            alert('Por favor, informe o nome do pet');
            return;
        }

        // Validar raça customizada
        if (this.newPet.breed === 'OTHER' && !this.customBreed.trim()) {
            alert('Por favor, informe a raça do pet');
            return;
        }

        const petData: CreatePetRequest = {
            name: this.newPet.name!,
            species: this.newPet.species!,
            breed: this.newPet.breed === 'OTHER' ? this.customBreed : this.newPet.breed!,
            ageCategory: this.newPet.ageCategory!,
            size: this.newPet.size!,
            gender: this.newPet.gender!,
            vaccinated: this.newPet.vaccinated!,
            neutered: this.newPet.neutered!,
            description: this.newPet.description
        };

        if (this.editingPet) {
            // Editar pet existente
            this.adminService.updatePet(this.editingPet.id, petData, this.selectedImages).subscribe({
                next: () => {
                    this.loadPets();
                    this.cancelForm();
                    alert('Pet atualizado com sucesso!');
                },
                error: (err: any) => {
                    console.error('Erro ao atualizar pet:', err);
                    alert('Erro ao atualizar pet');
                }
            });
        } else {
            // Criar novo pet
            this.adminService.createPet(petData, this.selectedImages).subscribe({
                next: () => {
                    this.loadPets();
                    this.cancelForm();
                    alert('Pet cadastrado com sucesso!');
                },
                error: (err: any) => {
                    console.error('Erro ao cadastrar pet:', err);
                    alert('Erro ao cadastrar pet');
                }
            });
        }
    }

    deletePet(pet: Pet) {
        if (confirm(`Tem certeza que deseja excluir ${pet.name}?`)) {
            this.adminService.deletePet(pet.id).subscribe({
                next: () => {
                    this.loadPets();
                    alert('Pet excluído com sucesso!');
                },
                error: (err: any) => {
                    console.error('Erro ao excluir pet:', err);
                    alert('Erro ao excluir pet');
                }
            });
        }
    }

    // Filtros
    applyFilters() {
        this.filteredPets = this.pets.filter(pet => {
            const matchesType = !this.filterType || pet.species === this.filterType;
            const matchesSearch = !this.filterSearch ||
                pet.name.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
                pet.breed.toLowerCase().includes(this.filterSearch.toLowerCase());

            return matchesType && matchesSearch;
        });
    }

    clearFilters() {
        this.filterType = '';
        this.filterSearch = '';
        this.filteredPets = [...this.pets];
    }

    // Limpar URLs de preview quando o componente for destruído
    ngOnDestroy() {
        this.selectedImages.forEach(file => {
            URL.revokeObjectURL(this.getImageUrl(file));
        });
    }
}
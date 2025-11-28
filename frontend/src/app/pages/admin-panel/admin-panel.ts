import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";
import { AnimalService } from '@services/animal.service';
import { AdminService, CreatePetRequest } from '@services/admin.service';
import { translator } from '@utils/translators';
import { reverseTranslator } from '@utils/reverse-translator';

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
export class AdminPanel implements OnInit, OnDestroy {
    pets: Pet[] = [];
    filteredPets: Pet[] = [];

    // Estados do formulário
    showAddForm = false;
    editingPet: Pet | null = null;

    // Dados do novo pet - AGORA COM VALORES EXPLÍCITOS
    newPet: {
        name: string;
        species: 'DOG' | 'CAT';
        breed: string;
        ageCategory: 'FILHOTE' | 'ADULTO' | 'IDOSO';
        size: 'SMALL' | 'MEDIUM' | 'LARGE';
        gender: 'MALE' | 'FEMALE';
        vaccinated: boolean;
        neutered: boolean;
        description?: string;
    } = this.getDefaultPetData();

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

    // === MÉTODOS DE CARREGAMENTO DE DADOS ===
    loadPets() {
        this.animalService.getAnimals().subscribe({
            next: (data: any[]) => {
                this.pets = this.translatePets(data);
                this.filteredPets = [...this.pets];
            },
            error: (err: any) => console.error('Erro ao carregar animais:', err)
        });
    }

    private translatePets(pets: any[]): Pet[] {
        return pets.map(pet => ({
            ...pet,
            species: translator.species(pet.species),
            gender: translator.gender(pet.gender),
            size: translator.size(pet.size),
            ageCategory: translator.age(pet.ageCategory)
        }));
    }

    // === MÉTODOS DO FORMULÁRIO ===
    startAddPet() {
        this.showAddForm = true;
        this.editingPet = null;
        this.resetForm();
    }

    startEditPet(pet: Pet) {
        this.showAddForm = true;
        this.editingPet = pet;

        // CORREÇÃO: Atribuição direta sem Partial
        this.newPet = {
            name: pet.name,
            species: reverseTranslator.species(pet.species) as 'DOG' | 'CAT',
            breed: pet.breed,
            ageCategory: reverseTranslator.age(pet.ageCategory) as 'FILHOTE' | 'ADULTO' | 'IDOSO',
            size: reverseTranslator.size(pet.size) as 'SMALL' | 'MEDIUM' | 'LARGE',
            gender: reverseTranslator.gender(pet.gender) as 'MALE' | 'FEMALE',
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
        this.newPet = this.getDefaultPetData();
        this.customBreed = '';
        this.selectedImages = [];
    }

    private getDefaultPetData() {
        return {
            name: '',
            species: 'DOG' as 'DOG' | 'CAT',
            breed: 'SRD',
            ageCategory: 'FILHOTE' as 'FILHOTE' | 'ADULTO' | 'IDOSO',
            size: 'SMALL' as 'SMALL' | 'MEDIUM' | 'LARGE',
            gender: 'MALE' as 'MALE' | 'FEMALE',
            vaccinated: false,
            neutered: false,
            description: 'Um pet amoroso em busca de um novo lar!'
        };
    }

    // === MÉTODOS PARA OS BOTÕES BOOLEANOS ===
    toggleVaccinated() {
        this.newPet.vaccinated = !this.newPet.vaccinated;
        console.log('🔄 Vacinado alterado para:', this.newPet.vaccinated);
    }

    toggleNeutered() {
        this.newPet.neutered = !this.newPet.neutered;
        console.log('🔄 Castrado alterado para:', this.newPet.neutered);
    }

    // === MÉTODOS DE IMAGENS ===
    getImageUrl(file: File): string {
        return URL.createObjectURL(file);
    }

    onImageSelected(event: any) {
        const files: FileList = event.target.files;
        if (files.length > 0) {
            this.selectedImages = Array.from(files);
        }
    }

    removeImage(index: number) {
        URL.revokeObjectURL(this.getImageUrl(this.selectedImages[index]));
        this.selectedImages.splice(index, 1);
    }

    // === MÉTODOS DE VALIDAÇÃO E SUBMISSÃO ===
    onBreedChange() {
        if (this.newPet.breed === 'OTHER') {
            this.newPet.breed = '';
        }
    }

    submitPet() {
        if (!this.validateForm()) return;

        const petData = this.preparePetData();

        // DEBUG: Verificar dados antes do envio
        console.log('🔍 DEBUG FINAL - Dados antes do envio:', {
            name: petData.name,
            species: petData.species,
            breed: petData.breed,
            vaccinated: petData.vaccinated,
            neutered: petData.neutered,
            typeOfVaccinated: typeof petData.vaccinated,
            typeOfNeutered: typeof petData.neutered
        });

        if (this.editingPet) {
            this.updatePet(petData);
        } else {
            this.createPet(petData);
        }
    }

    private validateForm(): boolean {
        if (!this.newPet.name) {
            alert('Por favor, informe o nome do pet');
            return false;
        }

        if (this.newPet.breed === 'OTHER' && !this.customBreed.trim()) {
            alert('Por favor, informe a raça do pet');
            return false;
        }

        return true;
    }

    private preparePetData(): CreatePetRequest {
        return {
            name: this.newPet.name,
            species: this.newPet.species,
            breed: this.newPet.breed === 'OTHER' ? this.customBreed : this.newPet.breed,
            ageCategory: this.newPet.ageCategory,
            size: this.newPet.size,
            gender: this.newPet.gender,
            vaccinated: this.newPet.vaccinated,
            neutered: this.newPet.neutered,
            description: this.newPet.description
        };
    }

    private createPet(petData: CreatePetRequest) {
        this.adminService.createPet(petData, this.selectedImages).subscribe({
            next: () => this.handleSuccess('Pet cadastrado com sucesso!'),
            error: (err: any) => this.handleError('Erro ao cadastrar pet', err)
        });
    }

    private updatePet(petData: CreatePetRequest) {
        this.adminService.updatePet(this.editingPet!.id, petData, this.selectedImages).subscribe({
            next: () => this.handleSuccess('Pet atualizado com sucesso!'),
            error: (err: any) => this.handleError('Erro ao atualizar pet', err)
        });
    }

    private handleSuccess(message: string) {
        this.loadPets();
        this.cancelForm();
        alert(message);
    }

    private handleError(message: string, err: any) {
        console.error(`${message}:`, err);
        alert(message);
    }

    // === MÉTODOS DE AÇÕES ===
    deletePet(pet: Pet) {
        if (confirm(`Tem certeza que deseja excluir ${pet.name}?`)) {
            this.adminService.deletePet(pet.id).subscribe({
                next: () => this.handleSuccess('Pet excluído com sucesso!'),
                error: (err: any) => this.handleError('Erro ao excluir pet', err)
            });
        }
    }

    // === MÉTODOS DE FILTRO ===
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

    // === CLEANUP ===
    ngOnDestroy() {
        this.selectedImages.forEach(file => {
            URL.revokeObjectURL(this.getImageUrl(file));
        });
    }
}
import { Routes } from '@angular/router';
import { Home } from '@pages/home/home';
import { AnimalDetail } from '@pages/animal-detail/animal-detail';
import { PetAwareness } from '@pages/pet-awareness/pet-awareness';
import { AdminPanel } from '@pages/admin-panel/admin-panel';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'animals/:id', component: AnimalDetail },
    { path: 'adocao-responsavel', component: PetAwareness },
    { path: 'admin', component: AdminPanel },
];
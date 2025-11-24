import { Routes } from '@angular/router';
import { Home } from '@pages/home/home';
import { PetDetail } from '@pages/pet-detail/pet-detail';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'animals/:id', component: PetDetail },
];
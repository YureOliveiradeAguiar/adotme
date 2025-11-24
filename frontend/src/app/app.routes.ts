import { Routes } from '@angular/router';
import { Home } from '@pages/home/home';
import { AnimalDetail } from '@pages/animal-detail/animal-detail';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'animals/:id', component: AnimalDetail },
];
import { Routes } from '@angular/router';
import { Home } from '@pages/home/home';
import { Animals } from '@pages/animals/animals';
import { AnimalDetail } from '@pages/animal-detail/animal-detail';
import { About } from '@pages/about/about';
import { AdoptionForm } from '@pages/adoption-form/adoption-form';


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'animals', component: Animals },
    { path: 'animals/:id', component: AnimalDetail },
    { path: 'about', component: About },
    { path: 'adopt', component: AdoptionForm },
];
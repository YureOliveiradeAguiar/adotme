import { Routes } from '@angular/router';
import { PageBase } from '@components/page-base/page-base';
import { Home } from '@pages/home/home';
import { PetDetail } from '@pages/pet-detail/pet-detail';

export const routes: Routes = [
  {
    path: '',
    component: PageBase,
    children: [
      { path: '', component: Home },
      { path: 'animals/:id', component: PetDetail },
    ],
  },
];
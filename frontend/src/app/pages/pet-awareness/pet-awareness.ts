import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '@components/header/header';
import { Footer } from '@components/footer/footer';

@Component({
    selector: 'page-pet-awareness',
    standalone: true,
    imports: [CommonModule, Header, Footer],
    templateUrl: './pet-awareness.html',
    styleUrls: ['./pet-awareness.scss']
})
export class PetAwareness { }

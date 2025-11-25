import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-page-base',
  templateUrl: './page-base.html',
  styleUrl: './page-base.scss',
  imports: [Header, Footer, RouterOutlet],
})
export class PageBase {

}

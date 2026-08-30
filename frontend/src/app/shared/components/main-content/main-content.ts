import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'maj-main-content',
  imports: [
    RouterOutlet
  ],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent { }

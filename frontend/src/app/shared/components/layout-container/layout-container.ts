import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'maj-layout-container',
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout-container.html',
  styleUrl: './layout-container.scss',
})
export class LayoutContainer { }

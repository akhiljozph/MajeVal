import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'maj-side-bar',
  imports: [],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {

  private router = inject(Router);

  onClick(route: string) {
    this.router.navigate([`/app/${route}`]);
  }
}

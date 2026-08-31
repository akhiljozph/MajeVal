import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'maj-nav-bar',
  imports: [
    MatIconModule
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  private router = inject(Router);

  handleLogout() {
    this.router.navigate([`/sign-in`]);
  }
}

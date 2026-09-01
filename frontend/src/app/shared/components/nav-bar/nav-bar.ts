import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { AuthStateService } from '@core/services/auth-state';
import { ConfirmationModalService } from '@shared/services/confirmation-modal';

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
  private modalService = inject(ConfirmationModalService);
  private authState = inject(AuthStateService);

  handleLogout() {
    this.modalService.open({
      title: 'Log Out',
      message: 'Are you sure you want to log out?',
      confirmText: 'Log Out',
      type: 'warning'
    }).subscribe((confirmed) => {
      if (confirmed) {
        this.authState.setAuthenticated(false);
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
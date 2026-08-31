import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ConfirmationModalService } from '../../services/confirmation-modal';

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

  handleLogout() {
    this.modalService.open({
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      confirmText: 'Delete Permanently',
      type: 'danger'
    }).subscribe((confirmed) => {
      if (confirmed) {
        // Execute delete call
      }
    });
    this.router.navigate([`/sign-in`]);
  }
}

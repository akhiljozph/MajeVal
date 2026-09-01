import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ConfirmationModalService } from '@shared/services/confirmation-modal';

@Component({
  selector: 'maj-confirmation-modal',
  imports: [
    CommonModule,
  ],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss',
})
export class ConfirmationModal {
  modalService = inject(ConfirmationModalService);
}

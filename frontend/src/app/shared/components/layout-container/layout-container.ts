import { Component } from '@angular/core';

import { NavBar } from '../nav-bar/nav-bar';
import { SideBar } from '../side-bar/side-bar';
import { MainContent } from '../main-content/main-content';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';

@Component({
  selector: 'maj-layout-container',
  imports: [
    NavBar,
    SideBar,
    MainContent,
    ConfirmationModal
  ],
  templateUrl: './layout-container.html',
  styleUrl: './layout-container.scss',
})
export class LayoutContainer { }

import { Component } from '@angular/core';

import { NavBar } from '../nav-bar/nav-bar';
import { SideBar } from '../side-bar/side-bar';
import { MainContent } from '../main-content/main-content';

@Component({
  selector: 'maj-layout-container',
  imports: [
    NavBar,
    SideBar,
    MainContent
  ],
  templateUrl: './layout-container.html',
  styleUrl: './layout-container.scss',
})
export class LayoutContainer { }

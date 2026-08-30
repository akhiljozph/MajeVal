import { Component } from '@angular/core';

import { NavBar } from '../nav-bar/nav-bar';
import { SideBar } from '../side-bar/side-bar';
import { MainLayout } from '../main-layout/main-layout';

@Component({
  selector: 'maj-layout-container',
  imports: [
    NavBar,
    SideBar,
    MainLayout
  ],
  templateUrl: './layout-container.html',
  styleUrl: './layout-container.scss',
})
export class LayoutContainer { }

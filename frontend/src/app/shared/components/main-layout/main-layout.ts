import { Component } from '@angular/core';

import { NavBar } from '../nav-bar/nav-bar';
import { SideBar } from '../side-bar/side-bar';
import { LayoutContainer } from '../layout-container/layout-container';

@Component({
  selector: 'maj-main-layout',
  imports: [
    NavBar,
    SideBar,
    LayoutContainer
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout { }

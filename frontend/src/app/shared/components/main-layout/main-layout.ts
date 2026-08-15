import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBar } from '../nav-bar/nav-bar';
import { SideBar } from '../side-bar/side-bar';

@Component({
  selector: 'maj-main-layout',
  imports: [
    RouterOutlet,
    NavBar,
    SideBar
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout { }

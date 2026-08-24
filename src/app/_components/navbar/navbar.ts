import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';


@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './navbar.html',

  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  collapseNavbar(): void {

    const navMenu =
      document.getElementById('navmenu');

    if (!navMenu) {
      return;
    }

    navMenu.classList.remove('show');

    const toggle =
      document.querySelector(
        '.navbar-toggler'
      ) as HTMLElement | null;

    if (toggle) {

      toggle.setAttribute(
        'aria-expanded',
        'false'
      );

    }

  }

}
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
import Swal from 'sweetalert2/dist/sweetalert2.js';


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

  showLoginNotice(): void {
    this.collapseNavbar();
    void Swal.fire({
      icon: 'info',
      title: 'Login coming soon',
      text: 'Online account login is not available yet. Please contact International Ecademy if you need assistance.',
      confirmButtonText: 'Got it'
    });
  }

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

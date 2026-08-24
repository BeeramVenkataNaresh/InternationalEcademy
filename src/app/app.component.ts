import { Component, HostListener } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { environment } from '../environments/environment';
import { MessageComponent } from './_components/Message/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MessageComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isBtnShow = false;
  topPositionToStartShowing = 100;

  title = environment.title;
  year = environment.year;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    }, 200);
  }

  collapseNavbar(): void {
    const nav = document.getElementById('navmenu');

    if (nav) {
      const bsCollapse = new (window as any).bootstrap.Collapse(nav, {
        toggle: false
      });

      bsCollapse.hide();
    }
  }

  @HostListener('window:scroll')
  checkScrollPosition(): void {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    this.isBtnShow =
      scrollPosition >= this.topPositionToStartShowing;
  }

  goTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
import {
  Component,
  HostListener,
  AfterViewInit
} from '@angular/core';

import {
  CommonModule,
  ViewportScroller
} from '@angular/common';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd
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


export class AppComponent implements AfterViewInit {

  isBtnShow = false;

  topPositionToStartShowing = 100;

  title = environment.title;

  year = environment.year;


  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {

    /*
     * Scroll to top after every Angular route change.
     */
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        /*
         * Wait for the new page to render,
         * then calculate the navbar height.
         */
        setTimeout(() => {

          this.updateNavbarHeight();

          this.viewportScroller.scrollToPosition([0, 0]);

        }, 50);

      }

    });

  }


  /*
   * Run after Angular has rendered the navbar.
   */
  ngAfterViewInit(): void {

    this.updateNavbarHeight();

    setTimeout(() => {

      this.updateNavbarHeight();

    }, 100);

  }


  /*
   * Update navbar height dynamically.
   */
  private updateNavbarHeight(): void {

    const navbar =
      document.querySelector('.navbar-custom') as HTMLElement | null;

    if (!navbar) {
      return;
    }

    const height = navbar.offsetHeight;

    document.documentElement.style.setProperty(
      '--navbar-height',
      `${height}px`
    );

  }


  /*
   * Update navbar height whenever
   * desktop/mobile size changes.
   */
  @HostListener('window:resize')
  onResize(): void {

    this.updateNavbarHeight();

  }


  /*
   * Close Bootstrap mobile navigation.
   */
  collapseNavbar(): void {

    const nav =
      document.getElementById('navmenu');

    if (nav) {

      const bsCollapse =
        new (window as any).bootstrap.Collapse(
          nav,
          {
            toggle: false
          }
        );

      bsCollapse.hide();

      /*
       * Recalculate because the mobile navbar
       * may have changed height.
       */
      setTimeout(() => {

        this.updateNavbarHeight();

      }, 50);

    }

  }


  /*
   * Show / hide scroll-to-top button.
   */
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


  /*
   * Scroll smoothly to page top.
   */
  goTop(): void {

    window.scroll({

      top: 0,

      left: 0,

      behavior: 'smooth'

    });

  }

}
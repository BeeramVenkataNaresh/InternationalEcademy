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
  RouterOutlet,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { NavbarComponent } from './_components/navbar/navbar';
import { FooterComponent } from './_components/footer/footer';


@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'International Ecademy';

  year = new Date().getFullYear();

  isBtnShow = false;


  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {

    this.router.events
      .pipe(
        filter(
          event => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {

        this.viewportScroller.scrollToPosition(
          [0, 0]
        );

      });

  }


  ngAfterViewInit(): void {

    setTimeout(() => {

      this.viewportScroller.scrollToPosition(
        [0, 0]
      );

    });

  }


  @HostListener('window:scroll', [])
  onWindowScroll(): void {

    this.isBtnShow =
      window.scrollY > 300;

  }


  goTop(): void {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

}
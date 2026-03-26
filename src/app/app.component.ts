import { Component, DoCheck, OnInit, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isBtnShow!: boolean;
  topPositionToStartShowing = 100;

  title = environment.title;
  year = environment.year;

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    }, 200);
  }

  collapseNavbar() {
    const nav = document.getElementById('navmenu');
    if (nav) {
      const bsCollapse = new (window as any).bootstrap.Collapse(nav, {
        toggle: false
      });
      bsCollapse.hide();
    }
  }

  @HostListener('window:scroll')
  checkScrollPosition() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPositionToStartShowing) {
      this.isBtnShow = true;
    } else {
      this.isBtnShow = false;
    }
  }

  goTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}

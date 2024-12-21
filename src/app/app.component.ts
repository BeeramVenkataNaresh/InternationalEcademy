import { Component, DoCheck, OnInit, HostListener} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { LoginService } from './_services/login.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {

  isBtnShow!: boolean;
  topPositionToStartShowing = 100;

  title = environment.title;
  displayMenu = false;
  year = environment.year;
  loginUser: any;
  loginUserRoleId: any;
  loginUserRole: any;
  loginUserUnit: any;
  loginUserModuleId: any;
  loginUserModule: any;
  loginUserRegionId: any;
  loginUserRegion: any;

  constructor(private loginService: LoginService, private router: Router, private viewportScroller: ViewportScroller) { 
    setTimeout(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    }, 200);
  }

  ngOnInit() {
    this.loginService.updateMenu.subscribe(result => {
      this.menuDisplay();
    });
    this.menuDisplay();
  }

  ngDoCheck(): void {
    if (this.router.url == '/login')
      this.displayMenu = true;
    else
      this.displayMenu = true;
  }

  menuDisplay() {
    this.loginUser = localStorage.getItem("loginUser");
    this.loginUserRoleId = localStorage.getItem("loginUserRoleId");
    this.loginUserRole = localStorage.getItem("loginUserRole");
    this.loginUserUnit = localStorage.getItem("loginUserUnit");
    this.loginUserModuleId = localStorage.getItem("loginUserModuleId");
    this.loginUserModule = localStorage.getItem("loginUserModule");
    this.loginUserRegionId = localStorage.getItem("loginUserRegionId");
    this.loginUserRegion = localStorage.getItem("loginUserRegion");
  }

  fnLogout() {
    this.loginService.fnLogout();
    this.ngOnInit();
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

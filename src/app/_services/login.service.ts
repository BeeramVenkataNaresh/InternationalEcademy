import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private _updateMenu = new Subject<void>();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  get updateMenu() {
    return this._updateMenu;
  }

  isLogged() {
    return localStorage.getItem("loginUser") != null && localStorage.getItem("loginUserRole") != null;
  }

  fnLogout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

}

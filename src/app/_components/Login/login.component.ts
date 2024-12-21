import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/_services/login.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginUser: any;
  submitted = false;
  title = environment.title;
  fieldTextType: boolean;
  todayDate: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loginUser = null;
    this.loginForm = this.formBuilder.group(
      {
        txtUserName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
        txtPwd: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Switching method (This function is to show or Hide the password)
  fnToggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  fnLogin(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // proceed if the form is valid
    if (this.loginForm.valid) {
      this.userService.getByName(this.f['txtUserName'].value).subscribe(
        result => {
          this.loginUser = result[0];
          if (this.loginUser.length == 0) {
            Swal.fire('User Name..!', 'Invalid user name.. Please check!', 'info');
          }
          else if (this.loginUser.length > 0) {
            if (this.loginUser[0]['Password'] != this.f['txtPwd'].value) {
              Swal.fire('Password..!', 'Invalid password.. Please check!', 'info');
            }
            else {
              localStorage.setItem('loginUserId', this.loginUser[0]['UserId']);
              localStorage.setItem('loginUser', this.loginUser[0]['UserName']);
              localStorage.setItem('loginUserRoleId', this.loginUser[0]['RoleId']);
              localStorage.setItem('loginUserRole', this.loginUser[0]['RoleName']);
              localStorage.setItem('loginUserUnitId', this.loginUser[0]['UnitId']);
              localStorage.setItem('loginUserUnit', this.loginUser[0]['UnitName']);
              localStorage.setItem('loginUserModuleId', this.loginUser[0]['ModuleId']);
              localStorage.setItem('loginUserModule', this.loginUser[0]['ModuleName']);
              localStorage.setItem('loginUserRegionId', this.loginUser[0]['RegionId']);
              localStorage.setItem('loginUserRegion', this.loginUser[0]['RegionName']);

              this.loginService.updateMenu.next();
              this.router.navigate(['/dashboard']);
            }
          }
        },
        error => {
          Swal.fire('Error @ Login page..! ', '500 - Internal Server Error..!', 'error');
        });
    }
  }

  fnClear(): void {
    this.submitted = false;
    this.loginForm.reset();
  }

}

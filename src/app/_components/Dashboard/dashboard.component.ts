import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dashBoardForm: FormGroup;
  submitted = false;
  loginUser: any;
  loginUserRoleId: any;
  loginUserRole: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginUser = localStorage.getItem("loginUser");
    this.loginUserRoleId = localStorage.getItem("loginUserRoleId");
    this.loginUserRole = localStorage.getItem("loginUserRole");
   }

  ngOnInit(): void {

    this.dashBoardForm = this.formBuilder.group(
      {
        
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.dashBoardForm.controls;
  }

}

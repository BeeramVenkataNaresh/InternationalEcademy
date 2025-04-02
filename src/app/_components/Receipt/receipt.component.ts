import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/_services/role.service';
import { UserService } from 'src/app/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {

  datePickerConfig: Partial<BsDatepickerConfig>;
  showAddEditForm = false;
  showSearch = true;
  selAction = "";
  formHeader = "View Data";

  active = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  usersForm: FormGroup;
  role: any;
  module: any;
  unit: any;
  region: any;
  users: any;
  originalUsers: any;
  dupRecord: any;
  displayColumns: any = ['#', 'Id', 'UserName', 'Password', 'FirstName', 'LastName', 'Phone', 'Email', 'RoleId', 'Role', 'Active'];
  rowCount: number;
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;

  constructor(private formBuilder: FormBuilder, private roleService: RoleService, private userService: UserService, private router: Router) {
    this.fnGetRoles();
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');

     // setting the datepicker
     this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD-MMM-YYYY',
        containerClass: 'theme-dark-blue',
        showWeekNumbers: false,
        //minDate: new Date(2021, 0, 1),
        //maxDate: new Date(2021, 11, 31),  
      }
    );
  }

  ngOnInit(): void {
    this.users = 0;
    this.usersForm = this.formBuilder.group(
      {
        txtFromDate: [formatDate(new Date(), 'dd-MMM-yyyy', 'en_US')],
        txtToDate: [formatDate(new Date(), 'dd-MMM-yyyy', 'en_US')],
        txtSearch: [''],
        txtUserId: [''],
        txtUserName: ['', [Validators.required, Validators.maxLength(15)]],
        txtPassword: ['', [Validators.required, Validators.maxLength(15)]],
        txtFirstName: ['', [Validators.required, Validators.maxLength(50)]],
        txtLastName: ['', [Validators.maxLength(50)]],
        txtPhone: ['', [Validators.required, Validators.maxLength(15)]],
        txtEmail: ['', [Validators.required, Validators.maxLength(50)]],
        txtRoleName: ['', [Validators.required]],
        txtActive: ['', Validators.required],
        txtCreated: [''],
        txtModified: ['']
      });
  }

  fnGetRoles() {
    this.roleService.getAll().subscribe(
      result => {
        this.role = result[0];
      },
      error => {
        Swal.fire('@ Retrive Roles..! ', error.message, 'error');
      });
  }


  get f(): { [key: string]: AbstractControl } {
    return this.usersForm.controls;
  }


  fnGetAll() {
    this.userService.getAll().subscribe(
      result => {
        this.users = result[0];
        this.originalUsers = result[0];

        if (this.users.length == 0) {
          Swal.fire('No data found..!', result.message, 'info');
        }
      },
      error => {
        Swal.fire('@ Retrive data..! ', error.message, 'error');
      });
  }

  fnSearch() {
    if (this.f['txtSearch'].value == null || this.f['txtSearch'].value == '') {
      this.fnGetAll();
    }
    else if (this.f['txtSearch'].value != null) {
      this.users = this.originalUsers;
      this.users = this.users.filter((users) => users.UserName == this.f['txtSearch'].value)
    }
  }

  fnClear() {
    this.ngOnInit();
  }

  fnAdd() {
    this.selAction = "Add";
    this.formHeader = "Add New Data";
    this.showAddEditForm = true;
    this.showSearch = false;
  }

  fnView(data: any) {
    this.selAction = "View";
    this.formHeader = "View Data";
    this.fnOpenAddEditForm(data);
    this.showAddEditForm = true;
    this.showSearch = false;
  }

  fnEdit(data: any) {
    this.selAction = "Edit";
    this.formHeader = "Modify Data";
    this.fnOpenAddEditForm(data);
    this.showAddEditForm = true;
    this.showSearch = false;
  }

  fnDelete(id) {
    Swal.fire({
      title: 'Are You Sure to Delete..?',
      text: 'You will not be able to recover this..!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.userService.delete(id).subscribe(
          result => {
            this.fnSearch();
            Swal.fire('Deleted', result.message, 'success');
          },
          error => {
            Swal.fire('@ Delete data..!', error.message, 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        //Swal.fire('Cancelled', '', 'error');
      }
    });
  }

  fnOpenAddEditForm(data = null) {
    this.showAddEditForm = true;
    if (data) {
      // display data on the form
      this.usersForm.patchValue({
        txtUserId: data.UserId,
        txtUserName: data.UserName,
        txtPassword: data.Password,
        txtFirstName: data.FirstName,
        txtLasttName: data.LastName,
        txtPhone: data.Phone,
        txtEmail: data.Email,
        txtRoleName: data.RoleId,
        txtActive: data.Active,
        txtCreated: data.Created,
        txtModified: data.Modified
      });
    }
  }

  fnNewSave(data: any) {
    this.userService.create(data).subscribe(
      result => {
        Swal.fire('Insert', result.message, 'success');
        this.fnGetAll();
        this.fnAddEditFormClose();
      },
      error => {
        Swal.fire('@ Add Save..!', error.message, 'error');
      });
  }

  fnEditSave(id, data: any) {
    this.userService.update(id, data).subscribe(
      result => {
        Swal.fire('Update', result.message, 'success');
        this.fnGetAll();
        this.fnAddEditFormClose();
      },
      error => {
        Swal.fire('@ Edit Save..!', error.message, 'error');
      });
  }

  fnAddEditFormSave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.usersForm.invalid) {
      return;
    }
    else {
      let body = {
        "userId": this.f['txtUserId'].value,
        "userName": this.f['txtUserName'].value,
        "password": this.f['txtPassword'].value,
        "firstName": this.f['txtFirstName'].value,
        "lastName": this.f['txtLastName'].value,
        "phone": this.f['txtPhone'].value,
        "email": this.f['txtEmail'].value,
        "roleId": this.f['txtRoleName'].value,
        "active": this.f['txtActive'].value,
        "created": this.f['txtCreated'].value,
        "modified": this.f['txtModified'].value
      }

      // check for duplicate
      this.userService.getByName(this.f['txtUserName'].value).subscribe(
        result => {
          this.dupRecord = result[0];
          if (result[0].length == 0) {
            // Action
            if (this.selAction == "Add") {
              // updating the created column with created message
              body['created'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
              this.fnNewSave(body);
            }
            if (this.selAction == "Edit") {
              // updating the modified column with modified message
              body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
              this.fnEditSave(this.f['txtUserId'].value, body);
            }
          }
          else if (result[0].length > 0) {
            if (this.selAction == "Add") {
              Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
            }
            if (this.selAction == "Edit") {
              if (this.dupRecord[0].UserId != this.f['txtUserId'].value) {
                Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
              }
              else if (this.dupRecord[0].UserId == this.f['txtUserId'].value) {
                // updating the modified column with modified message
                body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
                this.fnEditSave(this.f['txtUserId'].value, body);
              }
            }
          }
        },
        error => {
          Swal.fire('@ Check for duplicate..!', error.message, 'error');
        }
      );
    }
  }

  fnAddEditFormClear() {
    this.submitted = false;
    this.ngOnInit();
  }

  fnAddEditFormClose() {
    this.selAction = "";
    this.formHeader = "View Data";
    this.showAddEditForm = false;
    this.showSearch = true;
    this.fnAddEditFormClear();
  }

}

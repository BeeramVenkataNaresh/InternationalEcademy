import { formatDate } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/_services/role.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  showAddEditForm = false;
  selAction = "";
  formHeader = "";
  txtRoleId = "";
  txtRoleName = "";
  txtActive = "";
  txtCreated = "";
  txtModified = "";

  active = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  roleForm: FormGroup;
  role: any;
  originalRole: any;
  dupRecord: any;
  displayColumns: any = ['#', 'Id', 'Role', 'Active'];
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;

  constructor(private formBuilder: FormBuilder, private roleService: RoleService, private router: Router) {
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
  }

  ngOnInit(): void {
    this.role = 0;
    this.roleForm = this.formBuilder.group({
      txtSearch: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.roleForm.controls;
  }

  fnGetAll() {
    this.roleService.getAll().subscribe(
      result => {
        this.role = result[0];
        this.originalRole = result[0];

        if (this.role.length == 0) {
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
      this.role = this.originalRole;
      this.role = this.role.filter((role) => role.RoleName == this.f['txtSearch'].value)
    }
  }

  fnClear() {
    this.ngOnInit();
  }

  fnAdd() {
    this.selAction = "Add";
    this.formHeader = "Add New Data";
    this.openAddEditForm();
  }

  fnView(data: any) {
    this.selAction = "View";
    this.formHeader = "View Data";
    this.openAddEditForm(data);
  }

  fnEdit(data: any) {
    this.selAction = "Edit";
    this.formHeader = "Modify Data";
    this.openAddEditForm(data);
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
        this.roleService.delete(id).subscribe(
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

  openAddEditForm(data = null) {
    this.showAddEditForm = true;
    if (data) {
      this.txtRoleId = data.RoleId;
      this.txtRoleName = data.RoleName;
      this.txtActive = data.Active;
      this.txtCreated = data.Created;
      this.txtModified = data.Modified
    }
  }

  fnNewSave(data: any) {
    this.roleService.create(data).subscribe(
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
    this.roleService.update(id, data).subscribe(
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
    if (this.txtRoleName == "" || this.txtActive == "") {
      if (this.txtRoleName == "" || this.txtRoleName == null) {
        Swal.fire('Validation', 'Role Name should not be empty..!', 'warning');
        return;
      }
    }
    else {
      let body = {
        "roleId": this.txtRoleId,
        "roleName": this.txtRoleName,
        "active": this.txtActive,
        "created": this.txtCreated,
        "modified": this.txtModified
      }

      // check for duplicate
      this.roleService.getByName(this.txtRoleName).subscribe(
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
              this.fnEditSave(this.txtRoleId, body);
            }
          }
          else if (result[0].length > 0) {
            if (this.selAction == "Add") {
              Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
            }
            if (this.selAction == "Edit") {
              if (this.dupRecord[0].RoleId != this.txtRoleId) {
                Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
              }
              else if (this.dupRecord[0].RoleId == this.txtRoleId) {
                // updating the modified column with modified message
                body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
                this.fnEditSave(this.txtRoleId, body);
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
    this.txtRoleId = null;
    this.txtRoleName = null;
    this.txtActive = null;
    this.txtCreated = null;
    this.txtModified = null;
  }

  fnAddEditFormClose() {
    this.selAction = "";
    this.showAddEditForm = false;
    this.fnAddEditFormClear();
  }
}

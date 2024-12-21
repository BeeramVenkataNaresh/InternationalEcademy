import { formatDate } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeesService } from 'src/app/_services/fees.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent {
  showAddEditForm = false;
  selAction = "";
  formHeader = "";
  txtFeesId = "";
  txtExamLevel = "";
  txtRegistrationAmt = "";
  txtTuitionAmt = "";
  txtActive = "";
  txtCreated = "";
  txtModified = "";

  active = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  feesForm: FormGroup;
  fees: any;
  originalFees: any;
  dupRecord: any;
  displayColumns: any = ['#', 'Id', 'ExamLevel', 'RegistrationAmt', 'TuitionAmt', 'Active'];
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;

  constructor(private formBuilder: FormBuilder, private feesService: FeesService, private router: Router) {
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
  }

  ngOnInit(): void {
    this.fees = 0;
    this.feesForm = this.formBuilder.group({
      txtSearch: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.feesForm.controls;
  }

  fnGetAll() {
    this.feesService.getAll().subscribe(
      result => {
        this.fees = result[0];
        this.originalFees = result[0];

        if (this.fees.length == 0) {
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
      this.fees = this.originalFees;
      this.fees = this.fees.filter((fees) => fees.Grade == this.f['txtSearch'].value)
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
        this.feesService.delete(id).subscribe(
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
      this.txtFeesId = data.FeesId;
      this.txtExamLevel = data.ExamLevel;
      this.txtRegistrationAmt = data.RegistrationAmt;
      this.txtTuitionAmt = data.TuitionAmt;
      this.txtActive = data.Active;
      this.txtCreated = data.Created;
      this.txtModified = data.Modified
    }
  }

  fnNewSave(data: any) {
    this.feesService.create(data).subscribe(
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
    this.feesService.update(id, data).subscribe(
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
    if (this.txtExamLevel == "" || this.txtRegistrationAmt == "" || this.txtTuitionAmt == "" || this.txtActive == "") {
      if (this.txtExamLevel == "" || this.txtExamLevel == null) {
        Swal.fire('Validation', 'ExamLevel should not be empty..!', 'warning');
        return;
      }

      if (this.txtRegistrationAmt == "" || this.txtRegistrationAmt == null) {
        Swal.fire('Validation', 'Registration Amount should not be empty..!', 'warning');
        return;
      }

      if (this.txtTuitionAmt == "" || this.txtTuitionAmt == null) {
        Swal.fire('Validation', 'Tuitiopn amount should not be empty..!', 'warning');
        return;
      }
    }
    else {
      let body = {
        "feesId": this.txtFeesId,
        "examLevel": this.txtExamLevel,
        "registrationAmt": this.txtRegistrationAmt,
        "tuitionAmt": this.txtTuitionAmt,
        "active": this.txtActive,
        "created": this.txtCreated,
        "modified": this.txtModified
      }

      // check for duplicate
      this.feesService.getByName(this.txtExamLevel).subscribe(
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
              this.fnEditSave(this.txtFeesId, body);
            }
          }
          else if (result[0].length > 0) {
            if (this.selAction == "Add") {
              Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
            }
            if (this.selAction == "Edit") {
              if (this.dupRecord[0].FeesId != this.txtFeesId) {
                Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
              }
              else if (this.dupRecord[0].FeesId == this.txtFeesId) {
                // updating the modified column with modified message
                body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
                this.fnEditSave(this.txtFeesId, body);
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
    this.txtFeesId = null;
    this.txtExamLevel = null;
    this.txtRegistrationAmt = null;
    this.txtTuitionAmt = null;
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

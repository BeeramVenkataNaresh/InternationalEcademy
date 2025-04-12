import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  showAddEditForm = false;
  selAction = "";
  formHeader = "";
  txtAccId = "";
  txtAccName = "";
  txtActive = "";
  txtCreated = "";
  txtModified = "";

  active = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  accountForm: FormGroup;
  account: any | null;
  originalAccount: any | null;
  dupRecord: any;
  displayColumns: any = ['#', 'Id', 'Account', 'Active'];
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;
  selectedItem: any;
  closeResult: string;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) {
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
  }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      txtSearch: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.accountForm.controls;
  }

  fnGetAll() {
    this.accountService.getAll().subscribe(
      result => {
        this.account = result[0];
        this.originalAccount = result[0];

        if (this.account == null) {
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
      this.account = this.originalAccount;
      this.account = this.account.filter((account) => account.AccName == this.f['txtSearch'].value)
    }
  }

  fnClear() {
    this.ngOnInit();
  }

  fnAdd(content) {
    this.selAction = "Add";
    this.formHeader = "Add New Data";
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  fnEdit(content, data) {
    this.selAction = "Edit";
    this.formHeader = "Modify Data";

    this.txtAccId = data.AccId;
    this.txtAccName = data.AccName;
    this.txtActive = data.Active;
    this.txtCreated = data.Created;
    this.txtModified = data.Modified;

    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  fnView(content, data: any) {
    this.selAction = "View";
    this.formHeader = "View Data";
    
    this.txtAccId = data.AccId;
    this.txtAccName = data.AccName;
    this.txtActive = data.Active;
    this.txtCreated = data.Created;
    this.txtModified = data.Modified;

    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
        this.accountService.delete(id).subscribe(
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

  fnNewSave(data: any) {
    this.accountService.create(data).subscribe(
      result => {
        Swal.fire('Insert', result.message, 'success');
        this.fnGetAll();
        this.fnAddEditFormClear();
      },
      error => {
        Swal.fire('@ Add Save..!', error.message, 'error');
      });
  }

  fnEditSave(id, data: any) {
    this.accountService.update(id, data).subscribe(
      result => {
        Swal.fire('Update', result.message, 'success');
        this.fnGetAll();
        this.fnAddEditFormClear();
      },
      error => {
        Swal.fire('@ Edit Save..!', error.message, 'error');
      });
  }

  fnAddEditFormSave() {
    if (this.txtAccName == "" || this.txtAccName == null || this.txtActive == "" || this.txtActive == null ) {
      if (this.txtAccName == "" || this.txtAccName == null) {
        Swal.fire('Validation', 'Account Name should not be empty..!', 'warning');
        return;
      }
      if (this.txtActive == "" || this.txtActive == null) {
        Swal.fire('Validation', 'Please Select Active..!', 'warning');
        return;
      }
    }
    else {
      let body = {
        "accId": this.txtAccId,
        "accName": this.txtAccName,
        "active": this.txtActive,
        "created": this.txtCreated,
        "modified": this.txtModified
      }

      // check for duplicate
      this.accountService.getByName(this.txtAccName).subscribe(
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
              this.fnEditSave(this.txtAccId, body);
            }
          }
          else if (result[0].length > 0) {
            if (this.selAction == "Add") {
              Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
            }
            if (this.selAction == "Edit") {
              if (this.dupRecord[0].AccId != this.txtAccId) {
                Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
              }
              else if (this.dupRecord[0].AccId == this.txtAccId) {
                // updating the modified column with modified message
                body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
                this.fnEditSave(this.txtAccId, body);
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
    this.txtAccName = null;
    this.txtActive = null;
    this.txtCreated = null;
    this.txtModified = null;
  }

  fnClose() {
    this.selAction = "";
    this.fnAddEditFormClear();
  }
  
  private getDismissReason(reason: any): string {
    this.fnClose();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

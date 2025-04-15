import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
showAddEditForm = false;
  selAction = "";
  formHeader = "";
  txtCustId = "";
  txtCustName = "";
  txtCustPhone = "";
  txtCustEmail = "";
  txtActive = "";
  txtCreated = "";
  txtModified = "";

  active = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  customerForm: FormGroup;
  customer: any;
  originalCustomer: any;
  dupRecord: any;
  displayColumns: any = ['#', 'Id', 'Customer', 'Phone', 'Email-Id', 'Active'];
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;
  selectedItem: any;
  closeResult: string;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
  }

  ngOnInit(): void {
    this.customer = 0;
    this.customerForm = this.formBuilder.group({
      txtSearch: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  fnGetAll() {
    this.customerService.getAll().subscribe(
      result => {
        this.customer = result[0];
        this.originalCustomer = result[0];

        if (this.customer.length == 0) {
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
      this.customer = this.originalCustomer;
      this.customer = this.customer.filter((customer) => customer.CustName == this.f['txtSearch'].value)
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

    this.txtCustId = data.CustId;
    this.txtCustName = data.CustName;
    this.txtCustPhone = data.CustPhone;
    this.txtCustEmail = data.CustEmail;
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
    
    this.txtCustId = data.CustId;
    this.txtCustName = data.CustName;
    this.txtCustPhone = data.CustPhone;
    this.txtCustEmail = data.CustEmail;
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
        this.customerService.delete(id).subscribe(
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
    this.customerService.create(data).subscribe(
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
    this.customerService.update(id, data).subscribe(
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
    if (this.txtCustName == "" || this.txtCustName == null || this.txtActive == "" || this.txtActive == null ) {
      if (this.txtCustName == "" || this.txtCustName == null) {
        Swal.fire('Validation', 'Customer Name should not be empty..!', 'warning');
        return;
      }
      if (this.txtActive == "" || this.txtActive == null) {
        Swal.fire('Validation', 'Please Select Active..!', 'warning');
        return;
      }
    }
    else {
      let body = {
        "custId": this.txtCustId,
        "custName": this.txtCustName,
        "custPhone": this.txtCustPhone,
        "custEmail": this.txtCustEmail,
        "active": this.txtActive,
        "created": this.txtCreated,
        "modified": this.txtModified
      }

      // check for duplicate
      this.customerService.getByName(this.txtCustName).subscribe(
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
              this.fnEditSave(this.txtCustId, body);
            }
          }
          else if (result[0].length > 0) {
            if (this.selAction == "Add") {
              Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
            }
            if (this.selAction == "Edit") {
              if (this.dupRecord[0].CustId != this.txtCustId) {
                Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
              }
              else if (this.dupRecord[0].CustId == this.txtCustId) {
                // updating the modified column with modified message
                body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
                this.fnEditSave(this.txtCustId, body);
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
    this.txtCustName = null;
    this.txtCustPhone = null;
    this.txtCustEmail = null;
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

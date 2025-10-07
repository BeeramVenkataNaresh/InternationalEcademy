import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  showAddEditForm = false;
  selAction = "";
  formHeader = "";
  txtProductId = "";
  txtProductName = "";
  txtActive = "";
  txtCreated = "";
  txtModified = "";

  records = [{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 5, name: 5 }, { id: 10, name: 10 }, { id: 15, name: 15 }, { id: 20, name: 20 }, { id: 25, name: 25 }, { id: 50, name: 50 }, { id: 100, name: 100 }];
  pages: any;
  active = [{ id: 1, name: 'Yes' }, { id: 2, name: 'No' }];

  productForm: FormGroup;
  product: any;
  originalProduct: any;
  dupRecord: any;
  displayColumns: any = ['#', 'Id', 'Product', 'Active'];
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;
  selectedItem: any;
  closeResult: string;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private productService: ProductService, private router: Router) {
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
  }

  ngOnInit(): void {
    this.product = 0;
    this.productForm = this.formBuilder.group({
      txtSearch: [''],
      txtRecords: ['10']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }

  fnGetAll() {
    this.productService.getAll().subscribe(
      result => {
        this.product = result[0];
        this.originalProduct = result[0];

        if (this.product.length == 0) {
          Swal.fire('No data found..!', result.message, 'info');
        }
      },
      error => {
        Swal.fire('@ Retrive data..! ', error.message, 'error');
      });
  }

  fnSearch() {
    this.f['txtRecords'].setValue("10");
    if (this.f['txtSearch'].value == null || this.f['txtSearch'].value == '') {
      this.fnGetAll();
    }
    else if (this.f['txtSearch'].value != null) {
      // this.product = this.originalProduct;
      // this.product = this.product.filter((product) => product.ProductName == this.f['txtSearch'].value)

      this.productService.getByName(this.f['txtSearch'].value).subscribe(
        result => {
          this.product = result[0];

          if (this.product.length == 0) {
            Swal.fire('No data found..!', result.message, 'info');
          }
        },
        error => {
          Swal.fire('@ Retrive data..! ', error.message, 'error');
        });
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

    this.txtProductId = data.ProductId;
    this.txtProductName = data.ProductName;
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

    this.txtProductId = data.ProductId;
    this.txtProductName = data.ProductName;
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
        this.productService.delete(id).subscribe(
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
    this.productService.create(data).subscribe(
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
    this.productService.update(id, data).subscribe(
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
    if (this.txtProductName == "" || this.txtProductName == null || this.txtActive == "" || this.txtActive == null) {
      if (this.txtProductName == "" || this.txtProductName == null) {
        Swal.fire('Validation', 'Product Name should not be empty..!', 'warning');
        return;
      }
      if (this.txtActive == "" || this.txtActive == null) {
        Swal.fire('Validation', 'Please Select Active..!', 'warning');
        return;
      }
    }
    else {
      let body = {
        "productId": this.txtProductId,
        "productName": this.txtProductName,
        "active": this.txtActive,
        "created": this.txtCreated,
        "modified": this.txtModified
      }

      // check for duplicate
      this.productService.getByName(this.txtProductName).subscribe(
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
              this.fnEditSave(this.txtProductId, body);
            }
          }
          else if (result[0].length > 0) {
            if (this.selAction == "Add") {
              Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
            }
            if (this.selAction == "Edit") {
              if (this.dupRecord[0].ProductId != this.txtProductId) {
                Swal.fire('Duplicate', 'It is existing please check it..!', 'info');
              }
              else if (this.dupRecord[0].ProductId == this.txtProductId) {
                // updating the modified column with modified message
                body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
                this.fnEditSave(this.txtProductId, body);
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
    this.txtProductName = null;
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

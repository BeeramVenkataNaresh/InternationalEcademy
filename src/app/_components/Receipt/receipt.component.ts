import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { CustomerService } from 'src/app/_services/customer.service';
import { PaymentmodeService } from 'src/app/_services/paymentmode.service';
import { ProductService } from 'src/app/_services/product.service';
import { ReceiptService } from 'src/app/_services/receipt.service';
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

  records = [{ id: 1, name: 1 }, { id: 2, name: 2 }, { id: 5, name: 5 }, { id: 10, name: 10 }, { id: 15, name: 15 }, { id: 20, name: 20 }, { id: 25, name: 25 }, { id: 50, name: 50 }, { id: 100, name: 100 }];
  pages: any;
  active = [{ id: 1, name: 'Yes' }, { id: 2, name: 'No' }];

  receiptsForm: FormGroup;
  customers: any;
  products: any;
  accounts: any;
  paymodes: any;
  receipts: any;
  originalReceipts: any;
  dupRecord: any;
  displayColumns: any = ['#', 'Id', 'RectDt', 'CustId', 'CustName', 'ProductId', 'ProductName', 'AccId', 'AccName', 'PayModeId', 'PayModeName', 'Amount', 'Remarks', 'Active'];
  rowCount: number;
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private customerService: CustomerService, private paymodeService: PaymentmodeService, private productService: ProductService, private receiptService: ReceiptService, private router: Router) {
    
    this.fnGetCustomers();
    this.fnGetProducts();
    this.fnGetAccounts();
    this.fnGetPayModes();

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
    this.receipts = 0;
    this.receiptsForm = this.formBuilder.group(
      {
        txtRecords: ['10'],
        txtFromDate: [formatDate(new Date(), 'dd-MMM-yyyy', 'en_US')],
        txtToDate: [formatDate(new Date(), 'dd-MMM-yyyy', 'en_US')],
        txtSearchAccId: [''],
        txtSearchCustId: [''],
        txtSearchPayModeId: [''],
        txtSearchProductId: [''],
        txtRectId: [''],
        txtRectDt: [formatDate(new Date(), 'dd-MMM-yyyy', 'en_US')],
        txtCustId: ['', Validators.required],
        txtProductId: ['', Validators.required],
        txtAccId: ['', Validators.required],
        txtPayModeId: ['', Validators.required],
        txtAmount: ['', [Validators.required, Validators.maxLength(12)]],
        txtRemarks: ['', [Validators.required, Validators.maxLength(100)]],
        txtActive: ['', Validators.required],
        txtCreated: [''],
        txtModified: ['']
      });
  }

 
  fnGetCustomers() {
    this.customerService.getAll().subscribe(
      result => {
        this.customers = result[0];
      },
      error => {
        Swal.fire('@ Retrive Customers..! ', error.message, 'error');
      });
  }

  fnGetProducts() {
    this.productService.getAll().subscribe(
      result => {
        this.products = result[0];
      },
      error => {
        Swal.fire('@ Retrive Products..! ', error.message, 'error');
      });
  }

  fnGetAccounts() {
    this.accountService.getAll().subscribe(
      result => {
        this.accounts = result[0];
      },
      error => {
        Swal.fire('@ Retrive Accounts..! ', error.message, 'error');
      });
  }

  fnGetPayModes() {
    this.paymodeService.getAll().subscribe(
      result => {
        this.paymodes = result[0];
      },
      error => {
        Swal.fire('@ Retrive Pay Modes..! ', error.message, 'error');
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.receiptsForm.controls;
  }

  fnSearch() {
    let custId: any;
    let productId: any;
    let accId: any;
    let paymodeId: any;
   
    if (this.f['txtFromDate'].value == null || this.f['txtFromDate'].value == "") {
      Swal.fire('Validation', 'Please select the from Date..! it should not be empty..!', 'warning');
      return;
    }
    if (this.f['txtToDate'].value == null || this.f['txtToDate'].value == "") {
      Swal.fire('Validation', 'Please select the to Date..! it should not be empty..!', 'warning');
      return;
    }
    
    if ((this.f['txtSearchCustId'].value == null || this.f['txtSearchCustId'].value == "")) {
      custId = 0;
    }
    else {
      custId = this.f['txtSearchCustId'].value;
    }

    if ((this.f['txtSearchProductId'].value == null || this.f['txtSearchProductId'].value == "")) {
      productId = 0;
    }
    else {
      productId = this.f['txtSearchProductId'].value;
    }

    if ((this.f['txtSearchAccId'].value == null || this.f['txtSearchAccId'].value == "")) {
      accId = 0;
    }
    else {
      accId = this.f['txtSearchAccId'].value;
    }

    if ((this.f['txtSearchPayModeId'].value == null || this.f['txtSearchPayModeId'].value == "")) {
      paymodeId = 0;
    }
    else {
      paymodeId = this.f['txtSearchPayModeId'].value;
    }

    this.fnGetByQuery(formatDate(this.f['txtFromDate'].value, 'dd-MMM-yyyy', 'en_US'), formatDate(this.f['txtToDate'].value, 'dd-MMM-yyyy', 'en_US'), custId, productId, accId, paymodeId)
  }


  fnGetByQuery(fromDate, toDate, custId, productId, accId, paymodeId) {
    this.f['txtRecords'].setValue("10");
    this.receiptService.getByQuery(fromDate, toDate, custId, productId, accId, paymodeId).subscribe(
      result => {
        this.receipts = result[0];

        if (this.receipts.length == 0) {
          Swal.fire('No data found..!', result.message, 'info');
        }
      },
      error => {
        Swal.fire('@ Retrive data..! ', error.message, 'error');
      });
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
        this.receiptService.delete(id).subscribe(
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
      this.receiptsForm.patchValue({
        txtRectId: data.RectId,
        txtRectDt: data.RectDt,
        txtCustId: data.CustId,
        txtProductId: data.ProductId,
        txtAccId: data.AccId,
        txtPayModeId: data.PayModeId,
        txtAmount: data.Amount,
        txtRemarks: data.Remarks,
        txtActive: data.Active,
        txtCreated: data.Created,
        txtModified: data.Modified
      });
    }
  }

  fnNewSave(data: any) {
    this.receiptService.create(data).subscribe(
      result => {
        Swal.fire('Insert', result.message, 'success');
        this.fnAddEditFormClose();
      },
      error => {
        Swal.fire('@ Add Save..!', error.message, 'error');
      });
  }

  fnEditSave(id, data: any) {
    this.receiptService.update(id, data).subscribe(
      result => {
        Swal.fire('Update', result.message, 'success');
        this.fnAddEditFormClose();
      },
      error => {
        Swal.fire('@ Edit Save..!', error.message, 'error');
      });
  }

  fnAddEditFormSave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.receiptsForm.invalid) {
      return;
    }
    else {
      let body = {
        "rectId": this.f['txtRectId'].value,
        "rectDt": this.f['txtRectDt'].value,
        "custId": this.f['txtCustId'].value,
        "productId": this.f['txtProductId'].value,
        "accId": this.f['txtAccId'].value,
        "payModeId": this.f['txtPayModeId'].value,
        "amount": this.f['txtAmount'].value,
        "remarks": this.f['txtRemarks'].value,
        "active": this.f['txtActive'].value,
        "created": this.f['txtCreated'].value,
        "modified": this.f['txtModified'].value
      }

      // Action
      if (this.selAction == "Add") {
        // updating the created column with created message
        body['created'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
        this.fnNewSave(body);
      }
      
      if (this.selAction == "Edit") {
        // updating the modified column with modified message
        body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
        this.fnEditSave(this.f['txtRectId'].value, body);
      }
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

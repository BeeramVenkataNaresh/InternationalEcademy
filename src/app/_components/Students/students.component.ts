import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { formatDate } from '@angular/common'
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { StudentService } from 'src/app/_services/student.service';
import { ProductService } from 'src/app/_services/product.service';

import * as xls from 'xlsx';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { GradeService } from 'src/app/_services/grade.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {

  datePickerConfig: Partial<BsDatepickerConfig>;
  showAddEditForm = false;
  showSearch = true;
  selAction = "";
  formHeader = "View Data";

  active = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  studentsForm: FormGroup;
  products: any;
  grades: any;
  students: any;
  dupRecord: any;
  displayColumns: any = ['#', 'Id', 'StuName', 'FatherName', 'ProductId', 'ProductName', 'Phone', 'Email', 'Dt.Of.Birth', 'Dt.Of,Join', 'GradeId', 'GradeName','School', 'Address', 'Reference', 'Active'];
  rowCount: number;
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private gradeService: GradeService, private studentService: StudentService, private router: Router) {
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
    this.fnGetProducts();
    this.fnGetGrades();

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
    this.students = 0
    this.studentsForm = this.formBuilder.group(
      {
        txtFromDate: [formatDate(new Date(), 'dd-MMM-yyyy', 'en_US')],
        txtToDate: [formatDate(new Date(), 'dd-MMM-yyyy', 'en_US')],
        txtSearchExamLevel: [''],
        txtSearchGrade: [''],
        txtSearchProductId: [''],
        txtStuId: ['', [Validators.required]],
        txtStuName: ['', [Validators.required, Validators.maxLength(50)]],
        txtFName: ['', [Validators.required, Validators.maxLength(50)]],
        txtGrade: ['', [Validators.required]],
        txtPhone: ['', [Validators.required, Validators.maxLength(15)]],
        txtEmail: ['', [Validators.required, Validators.maxLength(50)]],
        txtSchool: ['', [Validators.required, Validators.maxLength(50)]],
        txtDOR: ['', [Validators.required, Validators.maxLength(12)]],
        txtArea: ['', [Validators.required, Validators.maxLength(50)]],
        txtExamLevel: ['', [Validators.required]],
        txtRegistrationAmt: ['', [Validators.required]],
        txtTuitionAmt: ['', [Validators.required]],
        txtTotalAmt: ['', [Validators.required]],
        txtActive: ['', Validators.required],
        txtCreated: [''],
        txtModified: ['']
      });
  }

  fnGetProducts() {
    this.productService.getAll().subscribe(
      result => {
        this.products = result[0];

        if (this.products == null) {
          Swal.fire('No data found..!', result.message, 'info');
        }
      },
      error => {
        Swal.fire('@ Retrive data..! ', error.message, 'error');
      });
  }

  fnGetGrades() {
    this.gradeService.getAll().subscribe(
      result => {
        this.grades = result[0];

        if (this.grades.length == 0) {
          Swal.fire('No data found..!', result.message, 'info');
        }
      },
      error => {
        Swal.fire('@ Retrive data..! ', error.message, 'error');
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.studentsForm.controls;
  }

  fnGetAll() {
    this.studentService.getAll().subscribe(
      result => {
        this.students = result[0];

        if (this.students.length == 0) {
          Swal.fire('No data found..!', result.message, 'info');
        }
      },
      error => {
        Swal.fire('@ Retrive data..! ', error.message, 'error');
      });
  }

  fnSearch() {
    let productId: any;
    let gradeId: any;

    if (this.f['txtFromDate'].value == null || this.f['txtFromDate'].value == "") {
      Swal.fire('Validation', 'Please select the from Date..! it should not be empty..!', 'warning');
      return;
    }
    if (this.f['txtToDate'].value == null || this.f['txtToDate'].value == "") {
      Swal.fire('Validation', 'Please select the to Date..! it should not be empty..!', 'warning');
      return;
    }

    if ((this.f['txtSearchProductId'].value == null || this.f['txtSearchProductId'].value == "")) {
      productId = 0;
    }
    else {
      productId = this.f['txtSearchProductId'].value;
    }

    if ((this.f['txtSearchGrade'].value == null || this.f['txtSearchGrade'].value == "")) {
      gradeId = 0;
    }
    else {
      gradeId = this.f['txtSearchGrade'].value;
    }

    this.fnGetByQuery(formatDate(this.f['txtFromDate'].value, 'dd-MMM-yyyy', 'en_US'), formatDate(this.f['txtToDate'].value, 'dd-MMM-yyyy', 'en_US'), productId, gradeId);
  }

  fnGetByQuery(fromDate, toDate, productId, gradeId) {
    this.fnGetAll();
    this.studentService.getByQuery(fromDate, toDate, productId, gradeId).subscribe(
      result => {
        this.students = result[0];

        if(this.students.length == 0) {
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
        this.studentService.delete(id).subscribe(
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
      this.studentsForm.patchValue({
        txtStuId: data.StuId,
        txtStuName: data.StuName,
        txtFName: data.FName,
        txtGrade: data.Grade,
        txtPhone: data.Phone,
        txtEmail: data.Email,
        txtDOR: formatDate(data.DOR, 'dd-MMM-yyyy', 'en_US'),
        txtSchool: data.School,
        txtArea: data.Area,
        txtRegistrationAmt: data.RegistrationAmt,
        txtTuitionAmt: data.TuitionAmt,
        txtTotalAmt: data.RegistrationAmt,
        txtActive: data.Active,
        txtCreated: data.Created,
        txtModified: data.Modified
      });
    }
  }

  fnEditSave(id, data: any) {
    this.studentService.update(id, data).subscribe(
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
    if (this.studentsForm.invalid) {
      return;
    }
    else {
      let body = {
        "stuId": this.f['txtStuId'].value,
        "stuName": this.f['txtStuName'].value,
        "fName": this.f['txtFName'].value,
        "grade": this.f['txtGrade'].value,
        "phone": this.f['txtPhone'].value,
        "email": this.f['txtEmail'].value,
        "dor": formatDate(this.f['txtDOR'].value, 'dd-MMM-yyyy', 'en_US'),
        "school": this.f['txtSchool'].value,
        "area": this.f['txtArea'].value,
        "registrationAmt": this.f['txtRegistrationAmt'].value,
        "tuitionAmt": this.f['txtTuitionAmt'].value,
        "totalAmt": this.f['txtTotalAmt'].value,
        "active": this.f['txtActive'].value,
        "created": this.f['txtCreated'].value,
        "modified": this.f['txtModified'].value
      }

      if (this.selAction == "Edit") {
        // updating the modified column with modified message
        body['modified'] = "By: " + this.loginUserName + ", On - " + formatDate(new Date(), 'dd-MMM-yyyy' + ' @ ' + 'hh:mm:ss a', 'en_US');
        this.fnEditSave(this.f['txtStuId'].value, body);
      }
    }
  }

  fnAddEditFormClose() {
    this.selAction = "";
    this.formHeader = "View Data";
    this.showAddEditForm = false;
    this.showSearch = true;
    this.submitted = false;
    this.ngOnInit();
  }

  fnPrint() {
    //window.print();
    this.fnGeneratePDF();
  }

  fnGeneratePDF() {
    let docDefinition = {
      header: 'Printing to PDF File',
      content: 'Sorry we are working on this, Comming Soon..!'
    };

    pdfMake.createPdf(docDefinition).open();
  }

  /** Detault name for excel file when download **/
  fileName = "EmployesData.xlsx";

  fnExportToExcel() {

    Swal.fire('Export to excel', 'Sorry we are working on this, Comming soon..!', 'info');

    // /** Passing the table id **/
    // let data = document.getElementById("employes-data");
    // const ws: xls.WorkSheet = xls.utils.table_to_sheet(data);

    // /** Generate workbook and add the worksheet **/
    // const wb: xls.WorkBook = xls.utils.book_new();
    // xls.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /** Save to  file **/
    // xls.writeFile(wb, this.fileName);
  }

}
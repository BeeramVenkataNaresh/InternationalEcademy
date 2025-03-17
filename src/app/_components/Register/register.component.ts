import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { formatDate } from '@angular/common';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  active = [
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
  ];

  grade = [
    { id: 1, name: '5 th' },
    { id: 2, name: '6 th' },
    { id: 3, name: '7 th' },
    { id: 4, name: '8 th' },
    { id: 5, name: '9 th' },
    { id: 6, name: '10 th' },
    { id: 7, name: 'Inter-I' },
    { id: 8, name: 'Inter-II' },
    { id: 9, name: 'Graduation' }
  ];

  datePickerConfig: Partial<BsDatepickerConfig>;
  showRegisterForm = false;
  registerForm: FormGroup;
  examLevelFees: any;
  submitted = false;
  loginUserRoleId: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private studentService: StudentService) {
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
    // this.fnExamLevelFees();

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

    this.registerForm = this.formBuilder.group(
      {
        txtStuName: ['', [Validators.required, Validators.maxLength(50)]],
        txtFName: ['', [Validators.required, Validators.maxLength(50)]],
        txtGrade: ['', [Validators.required]],
        txtPhone: ['', [Validators.required, Validators.maxLength(15)]],
        txtEmail: ['', [Validators.required, Validators.maxLength(50)]],
        txtSchool: ['', [Validators.required, Validators.maxLength(50)]],
        txtDOR: [formatDate(new Date(), 'dd-MMM-yyyy', 'en_US'), [Validators.required, Validators.maxLength(12)]],
        txtArea: ['', [Validators.required, Validators.maxLength(50)]],
        txtRegistrationAmt: ['', [Validators.required]],
        txtTuitionAmt: ['', [Validators.required]],
        txtTotalAmt: ['', [Validators.required]],
        txtActive: ['', Validators.required],
        txtCreated: [''],
        txtModified: ['']
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  fnClose() {
    this.showRegisterForm = false;
  }

  fnPayment() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      var dor = "";
      if (this.f['txtDOR'].value == "") {
        dor = null;
      } else {
        dor = formatDate(this.f['txtDOR'].value, 'dd-MMM-yyyy', 'en_US')
      }

      // Construct Body
      let body = {
        "stuName": this.f['txtStuName'].value,
        "fName": this.f['txtFName'].value,
        "grade": this.f['txtGrade'].value,
        "phone": this.f['txtPhone'].value,
        "email": this.f['txtEmail'].value,
        "dor": formatDate(this.f['txtDOR'].value, 'dd-MMM-yyyy', 'en_US'),
        "area": this.f['txtArea'].value,
        "school": this.f['txtSchool'].value,
        "registrationAmt": this.f['txtRegistrationAmt'].value,
        "tuitionAmt": this.f['txtTuitionAmt'].value,
        "totalAmt": this.f['txtTotalAmt'].value,
        "active": this.f['txtActive'].value,
        "created": this.f['txtCreated'].value,
        "modified": this.f['txtModified'].value
      }

      this.router.navigateByUrl(['/paymentgateway/'] + this.f['txtTotalAmt'].value);

      // this.studentService.create(body).subscribe(
      //   result => {
      //     Swal.fire('Insert', result.message, 'success');
      //     this.router.navigate(['/paymentgateway']);
      //   },
      //   error => {
      //     Swal.fire('@ Add Save..!', error.message, 'error');
      //   });
    }
  }

  fnClear() {
    this.submitted = false;
    this.ngOnInit();
  }
}

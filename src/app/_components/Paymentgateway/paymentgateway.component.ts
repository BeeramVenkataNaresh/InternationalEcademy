import { Component, OnInit, NgModule } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentgatewayService } from 'src/app/_services/paymentgateway.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-paymentgateway',
  templateUrl: './paymentgateway.component.html',
  styleUrls: ['./paymentgateway.component.css']
})
export class PaymentgatewayComponent {

  paymentgatewayForm: FormGroup;
  paybleAmt: string;
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private paymentgatewayServier: PaymentgatewayService) {
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.paybleAmt = params.get('amt')!;
    });

    this.paymentgatewayForm = this.formBuilder.group({
      txtAmt: [this.paybleAmt, [Validators.required]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.paymentgatewayForm.controls;
  }

  fnSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.paymentgatewayForm.invalid) {
      return;
    }
    else {
      this.paymentgatewayServier.post('/payment_gateway/payumoney').subscribe(
        result => {
          Swal.fire('Please pay..!', this.f['txtAmt'].value, 'info');
        },
        error => {
          Swal.fire('@ Payment Gateway..!', error.message, 'error');
        });
    }
  }

  fnBack() {
    this.router.navigate(['/register']);
  }
}

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
  currency = [
    { id: 'INR', name: 'INR' },
    { id: 'USD', name: 'USD' },
    { id: 'CAD', name: 'CAD' }
  ];
  submitted = false;
  loginUserName: any;
  loginUserRoleId: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private paymentgatewayServier: PaymentgatewayService) {
    this.loginUserName = localStorage.getItem('loginUser');
    this.loginUserRoleId = localStorage.getItem('loginUserRoleId');
  }

  ngOnInit(): void {
    this.paymentgatewayForm = this.formBuilder.group({
      txtAmount: ['', [Validators.required]],
      txtCurrency: ['', [Validators.required]],
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
      let body = {
        "amount": +this.f['txtAmount'].value,
        "currency": this.f['txtCurrency'].value
      }
      this.paymentgatewayServier.createOrder(body).subscribe(
        (result: any) => {
          const options = {
            key: 'rzp_test_u2zpkcOfjVym1W', // Your Razorpay Key ID
            amount: result.amount,
            currency: result.currency,
            name: "International Ecadeny", // 'Your Company Name',
            description: "Payment Transaction", // 'Test Transaction',
            order_id: result.id,
            handler: function (response: any) {
              console.log('Payment ID:', response.razorpay_payment_id);
              console.log('Order ID:', response.razorpay_order_id);
              console.log('Signature:', response.razorpay_signature);
              Swal.fire('Message..!', 'Payment Success..!', 'success'); //alert('Payment successful!');
            },
            prefill: {
              name: "Guest", //'Your Name',
              email: "example@example.com", //'your_email@example.com',
              contact: "98858 88665", //'9999999999',
            },
            theme: {
              color: '#3399cc',
            },
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        },
        (error) => {
          Swal.fire('@ Payment Gateway..!', error.message, 'error');
          console.error('@ Payment Gateway..!', error);
        }
      );
    }
  }

  fnClear() {
    this.submitted = false;
    this.ngOnInit();
  }

  // fnSubmit() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.paymentgatewayForm.invalid) {
  //     return;
  //   }
  //   else {
  //     let body = {
  //       "amount": +this.f['txtAmount'].value,
  //       "currency": this.f['txtCurrency'].value
  //     }

  //     this.paymentgatewayServier.createOrder(body).subscribe(
  //       result => {
  //         Swal.fire('Message..!', 'Payment Success..!', 'success');
  //       },
  //       error => {
  //         Swal.fire('@ Payment Gateway..!', error.message, 'error');
  //       });
  //   }
  // }
}

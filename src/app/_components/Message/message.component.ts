import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  messageForm: FormGroup;
  submitted: boolean;

  constructor(public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      txtName: ['', Validators.required],
      txtEmail: ['', [Validators.required, Validators.email]],
      txtPhone: ['', Validators.required],
      txtMsg: ['', Validators.required]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.messageForm.controls; }

  fnSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.messageForm.invalid) {
      return;
    }

    Swal.fire('Message', 'Sent successfully..!', 'success');
  }

  fnCancel() {
    this.submitted = false;
    this.messageForm.reset();
  }
}

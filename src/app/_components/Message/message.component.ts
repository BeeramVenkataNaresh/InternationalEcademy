import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messageForm!: FormGroup;

  submitted = false;

  constructor(
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    this.messageForm = this.formBuilder.group({

      txtName: [
        '',
        Validators.required
      ],

      txtEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      txtPhone: [
        '',
        Validators.required
      ],

      txtMsg: [
        '',
        Validators.required
      ]

    });
  }

  get f() {
    return this.messageForm.controls;
  }

  fnSubmit(): void {

    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    Swal.fire(
      'Message',
      'Sent successfully..!',
      'success'
    );
  }

  fnCancel(): void {

    this.submitted = false;

    this.messageForm.reset();
  }
}
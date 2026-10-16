import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  title = environment.title;

  message = { name: '', email: '', phone: '', body: '' };
  submitted = false;
  isSending = false;

  constructor(private http: HttpClient) {}

  sendMessage(form: NgForm): void {
    this.submitted = true;
    if (this.isSending) return;
    if (form.invalid) {
      void Swal.fire({
        icon: 'warning',
        title: 'Check your message',
        text: 'Please complete the required fields and enter a valid email and phone number.'
      });
      return;
    }

    const { emailJsServiceId, emailJsTemplateId, emailJsPublicKey } = environment;
    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      void Swal.fire({
        icon: 'error',
        title: 'Email service not configured',
        text: 'Please email internationalecademy@gmail.com directly for now.'
      });
      return;
    }

    this.isSending = true;
    this.http.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        service_id: emailJsServiceId,
        template_id: emailJsTemplateId,
        user_id: emailJsPublicKey,
        template_params: {
          from_name: this.message.name.trim(),
          from_email: this.message.email.trim(),
          phone_number: this.message.phone.trim(),
          message: this.message.body.trim()
        }
      },
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        this.isSending = false;
        form.resetForm({ name: '', email: '', phone: '', body: '' });
        this.submitted = false;
        void Swal.fire({
          icon: 'success',
          title: 'Message sent',
          text: 'Thank you for contacting us. Our team will get back to you.'
        });
      },
      error: () => {
        this.isSending = false;
        void Swal.fire({
          icon: 'error',
          title: 'Message not sent',
          text: 'Please try again or email internationalecademy@gmail.com.'
        });
      }
    });
  }

  clearMessage(form: NgForm): void {
    form.resetForm({ name: '', email: '', phone: '', body: '' });
    this.submitted = false;
  }
}

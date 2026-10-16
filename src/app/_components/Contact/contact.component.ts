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
        icon: 'info',
        title: 'It will be back soon! ✨',
        html: 'Please email us at <a href="mailto:internationalecademy@gmail.com"><strong>internationalecademy@gmail.com</strong></a>. We are happy to assist you! 😊',
        confirmButtonText: 'Understood',
        confirmButtonColor: '#0d5399'
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
          title: 'Thanks, we got it!',
          text: 'Your message is on its way. We’ll be in touch soon.'
        });
      },
      error: () => {
        this.isSending = false;
        void Swal.fire({
          icon: 'error',
          title: 'Oops, that didn’t go through',
          text: 'Please try sending your message again. If it still doesn’t work, email us at internationalecademy@gmail.com.'
        });
      }
    });
  }

  clearMessage(form: NgForm): void {
    form.resetForm({ name: '', email: '', phone: '', body: '' });
    this.submitted = false;
  }
}

# International-Ecademy
Educational Site

## Contact form email setup

The contact form sends through EmailJS. To activate it:

1. Create an EmailJS account and connect the mailbox that will send website enquiries.
2. Create an email template with **To email** set to `internationalecademy@gmail.com`, **Reply to** set to `{{from_email}}`, and these template variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone_number}}`
   - `{{message}}`
3. Copy the EmailJS service ID, template ID, and public key into `emailJsServiceId`, `emailJsTemplateId`, and `emailJsPublicKey` in both `src/environments/environment.ts` and `src/environments/environment.prod.ts`.
4. In the EmailJS dashboard, restrict the public key to the deployed site domain where that option is available.

Only the EmailJS public key belongs in the Angular environment. Do not put an EmailJS private key or mailbox password in frontend code. The form shows a success or error message after each send attempt.

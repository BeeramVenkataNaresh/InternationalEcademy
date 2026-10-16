import { Routes } from '@angular/router';
import { ContactComponent } from './_components/Contact/contact.component';
import { RegisterComponent } from './_components/Register/register.component';
import { Home } from './_components/home/home';
import { Education } from './_components/education/education';
import { Business } from './_components/business/business';
import { Careers } from './_components/careers/careers';
import { International } from './_components/international/international';
import { Training } from './_components/training/training';
import { About } from './_components/about/about';
import { FaqsComponent } from './_components/Faqs/faqs.component';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'education', component: Education },
  { path: 'business', component: Business },
  { path: 'careers', component: Careers },
  { path: 'international', component: International },
  { path: 'training', component: Training },
  { path: 'faqs', component: FaqsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
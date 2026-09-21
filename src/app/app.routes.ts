import { Routes } from '@angular/router';

import { Home1Component } from './_components/Home1/home1.component';
import { ContactComponent } from './_components/Contact/contact.component';
import { AboutComponent } from './_components/About/about.component';
import { RegisterComponent } from './_components/Register/register.component';
import { MessageComponent } from './_components/Message/message.component';
import { Grade9 } from './_components/Grade9/grade9';
import { Grade10 } from './_components/Grade10/grade10';
import { Grade11Component } from './_components/Grade11/grade11.component';
import { Grade12Component } from './_components/Grade12/grade12.component';
import { Others } from './_components/Others/others';
import { VisionComponent } from './_components/Vision/vision.component';
import { ManagementComponent } from './_components/Management/management.component';
import { FaqsComponent } from './_components/Faqs/faqs.component';
import { TestComponent } from './_components/Test/test.component';
import { Home } from './_components/home/home';
import { About1Component } from './_components/About1/about1.component';
import { Education } from './_components/education/education';
import { Business } from './_components/business/business';
import { Careers } from './_components/careers/careers';
import { International } from './_components/international/international';
import { Training } from './_components/training/training';

export const routes: Routes = [
  { path: 'home1', component: Home1Component },
  { path: 'home', component: Home },
  { path: 'about1', component: About1Component },
  { path: 'about', component: AboutComponent },
  { path: 'education', component: Education },
  { path: 'business', component: Business },
  { path: 'careers', component: Careers },
  { path: 'international', component: International },
  { path: 'training', component: Training },
  { path: 'vision', component: VisionComponent },
  { path: 'management', component: ManagementComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'grade9', component: Grade9 },
  { path: 'grade10', component: Grade10 },
  { path: 'grade11', component: Grade11Component },
  { path: 'grade12', component: Grade12Component },
  { path: 'others', component: Others },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'message', component: MessageComponent },
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
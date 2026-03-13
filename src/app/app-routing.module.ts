import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './_components/Home/home.component';
import { ContactComponent } from './_components/Contact/contact.component';
import { AboutComponent } from './_components/About/about.component';
import { RegisterComponent } from './_components/Register/register.component';
import { MessageComponent } from './_components/Message/message.component';
import { Grade9 } from './_components/Grade9/grade9';
import { Grade10 } from './_components/Grade10/grade10';
import { Grade11Component } from './_components/Grade11/grade11.component';
import { Grade12Component } from './_components/Grade12/grade12.component';
import { VisionComponent } from './_components/Vision/vision.component';
import { ManagementComponent } from './_components/Management/management.component';
import { FaqsComponent } from './_components/Faqs/faqs.component';
import { TestComponent } from './_components/Test/test.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "vision", component: VisionComponent },
  { path: "management", component: ManagementComponent },
  { path: "faqs", component: FaqsComponent },
  { path: "grade9", component: Grade9 },
  { path: "grade10", component: Grade10 },
  { path: "grade11", component: Grade11Component },
  { path: "grade12", component: Grade12Component },
  { path: "contact", component: ContactComponent },
  { path: "register", component: RegisterComponent },
  { path: "message", component: MessageComponent },
  { path: "test", component: TestComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

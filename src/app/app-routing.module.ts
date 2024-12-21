import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './_components/Home/home.component';
import { LoginComponent } from './_components/Login/login.component';
import { ContactComponent } from './_components/Contact/contact.component';
import { AuthGuard } from './_guard/auth.guard';
import { AboutComponent } from './_components/About/about.component';
import { RegisterComponent } from './_components/Register/register.component';
import { RoleComponent } from './_components/Role/role.component';
import { UserComponent } from './_components/User/user.component';
import { DashboardComponent } from './_components/Dashboard/dashboard.component';
import { FeesComponent } from './_components/Fees/fees.component';
import { StudentsComponent } from './_components/Students/students.component';
import { MessageComponent } from './_components/Message/message.component';
import { PaymentgatewayComponent } from './_components/Paymentgateway/paymentgateway.component';
import { Grade11Component } from './_components/Grade11/grade11.component';
import { Grade12Component } from './_components/Grade12/grade12.component';
import { VisionComponent } from './_components/Vision/vision.component';
import { StaffComponent } from './_components/Staff/staff.component';
import { AccreditComponent } from './_components/Accredit/accredit.component';
import { FaqsComponent } from './_components/Faqs/faqs.component';
import { SafetyComponent } from './_components/Safety/safety.component';
import { PolicyComponent } from './_components/Policy/policy.component';
import { SupportComponent } from './_components/Support/support.component';
import { HandbookComponent } from './_components/Handbook/handbook.component';
import { CalendarComponent } from './_components/Calendar/calendar.component';
import { TestComponent } from './_components/Test/test.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "vision", component: VisionComponent },
  { path: "staff", component: StaffComponent },
  { path: "accredit", component: AccreditComponent },
  { path: "handbook", component: HandbookComponent },
  { path: "support", component: SupportComponent },
  { path: "policy", component: PolicyComponent },
  { path: "safety", component: SafetyComponent },
  { path: "faqs", component: FaqsComponent },
  { path: "grade11", component: Grade11Component },
  { path: "grade12", component: Grade12Component },
  { path: "calendar", component: CalendarComponent },
  { path: "contact", component: ContactComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "role", component: RoleComponent },
  { path: "user", component: UserComponent },
  { path: "fees", component: FeesComponent },
  { path: "students", component: StudentsComponent },
  { path: "paymentgateway/:amt", component: PaymentgatewayComponent },
  { path: "message", component: MessageComponent },
  { path: "test", component: TestComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

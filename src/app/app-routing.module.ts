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
import { StudentsComponent } from './_components/Students/students.component';
import { MessageComponent } from './_components/Message/message.component';
import { PaymentgatewayComponent } from './_components/Paymentgateway/paymentgateway.component';
import { Grade11Component } from './_components/Grade11/grade11.component';
import { Grade12Component } from './_components/Grade12/grade12.component';
import { VisionComponent } from './_components/Vision/vision.component';
import { ManagementComponent } from './_components/Management/management.component';
import { FaqsComponent } from './_components/Faqs/faqs.component';
import { TestComponent } from './_components/Test/test.component';
import { BcmitComponent } from './_components/BrainCheckerMIT/bcmit.component';
import { BcciqtComponent } from './_components/BrainCheckerCIQT/bcciqt.component';
import { BcbrainstaminaComponent } from './_components/BrainCheckerBrainStamina/bcbrainstamina.component';
import { BcbcpaComponent } from './_components/BrainCheckerBCPA/bcbcpa.component';
import { BcbestComponent } from './_components/BrainCheckerBEST/bcbest.component';
import { BcigniteComponent } from './_components/BrainCheckerIgnite/bcignite.component';
import { EnglishacademyComponent } from './_components/Englishacademy/englishacademy.component';
import { BchpactComponent } from './_components/BrainCheckerHPact/bchpact.component';
import { ProductComponent } from './_components/Product/product.component';
import { GradeComponent } from './_components/Grade/grade.component';
import { AccountComponent } from './_components/Account/account.component';
import { PaymentmodeComponent } from './_components/Paymentmode/paymentmode.component';
import { CustomerComponent } from './_components/Customer/customer.component';
import { ReceiptComponent } from './_components/Receipt/receipt.component';
import { PaymentComponent } from './_components/Payment/payment.component';
import { EroboticsComponent } from './_components/Erobotics/erobotics.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "vision", component: VisionComponent },
  { path: "management", component: ManagementComponent },
  { path: "faqs", component: FaqsComponent },
  { path: "grade11", component: Grade11Component },
  { path: "grade12", component: Grade12Component },
  { path: "englishacademy", component: EnglishacademyComponent },
  { path: "erobotics", component: EroboticsComponent },
  { path: "bcmit", component: BcmitComponent },
  { path: "bcbcpa", component: BcbcpaComponent },
  { path: "bchpact", component: BchpactComponent },
  { path: "bcciqt", component: BcciqtComponent },
  { path: "bcbrainstamina", component: BcbrainstaminaComponent },
  { path: "bcbest", component: BcbestComponent },
  { path: "bcignite", component: BcigniteComponent },
  { path: "contact", component: ContactComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "paymentgateway", component: PaymentgatewayComponent },
  { path: "message", component: MessageComponent },
  { path: "dashboard", component: DashboardComponent, canActivate:[AuthGuard] },
  { path: "role", component: RoleComponent, canActivate:[AuthGuard] },
  { path: "user", component: UserComponent, canActivate:[AuthGuard] },
  { path: "account", component: AccountComponent, canActivate:[AuthGuard] },
  { path: "paymentmode", component: PaymentmodeComponent, canActivate:[AuthGuard] },
  { path: "students", component: StudentsComponent, canActivate:[AuthGuard] },
  { path: "product", component: ProductComponent, canActivate:[AuthGuard] },
  { path: "grade", component: GradeComponent, canActivate:[AuthGuard] },
  { path: "customer", component: CustomerComponent, canActivate:[AuthGuard] },
  { path: "receipt", component: ReceiptComponent, canActivate:[AuthGuard] },
  { path: "payment", component: PaymentComponent, canActivate:[AuthGuard] },
  { path: "test", component: TestComponent, canActivate:[AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

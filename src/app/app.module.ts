import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination'; // For Pagenation
import { NgArrayPipesModule } from 'ngx-pipes'; // For Filter using pipe
import { DataTablesModule } from 'angular-datatables'; // For Data Tables with Pagination, Sorting, Filtering
import { CarouselModule } from 'ngx-owl-carousel-o'; // for Carousel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './_components/Home/home.component';
import { LoginComponent } from './_components/Login/login.component';
import { ContactComponent } from './_components/Contact/contact.component';
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
import { TestComponent } from './_components/Test/test.component';
import { BcmitComponent } from './_components/BrainCheckerMIT/bcmit.component';
import { BcciqtComponent } from './_components/BrainCheckerCIQT/bcciqt.component';
import { BcbrainstaminaComponent } from './_components/BrainCheckerBrainStamina/bcbrainstamina.component';
import { BcbcpaComponent } from './_components/BrainCheckerBCPA/bcbcpa.component';
import { BcbestComponent } from './_components/BrainCheckerBEST/bcbest.component';
import { BcigniteComponent } from './_components/BrainCheckerIgnite/bcignite.component';
import { BchpactComponent } from './_components/BrainCheckerHPact/bchpact.component';
import { ProductComponent } from './_components/Product/product.component';
import { GradeComponent } from './_components/Grade/grade.component';
import { AccountComponent } from './_components/Account/account.component';
import { PaymentmodeComponent } from './_components/Paymentmode/paymentmode.component';
import { CustomerComponent } from './_components/Customer/customer.component';
import { ReceiptComponent } from './_components/Receipt/receipt.component';
import { PaymentComponent } from './_components/Payment/payment.component';
import { EnglishacademyComponent } from './_components/Englishacademy/englishacademy.component';
import { EroboticsComponent } from './_components/Erobotics/erobotics.component';
import { ManagementComponent } from './_components/Management/management.component';

@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    VisionComponent,
    Grade11Component,
    Grade12Component,
    EnglishacademyComponent,
    EroboticsComponent,
    BcmitComponent,
    BcbcpaComponent,
    BchpactComponent,
    BcciqtComponent,
    BcbrainstaminaComponent,
    BcbestComponent,
    BcigniteComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    RoleComponent,
    UserComponent,
    AccountComponent,
    PaymentmodeComponent,
    ProductComponent,
    GradeComponent,
    CustomerComponent,
    StudentsComponent,
    ReceiptComponent,
    PaymentComponent,
    PaymentgatewayComponent,
    MessageComponent,
    ManagementComponent,
    TestComponent
  ],

  imports: [
    CarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NgxPaginationModule,
    NgArrayPipesModule,
    DataTablesModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

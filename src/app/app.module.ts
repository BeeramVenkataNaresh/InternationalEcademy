import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o'; // for Carousel

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './_components/Home/home.component';
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
import { TestComponent } from './_components/Test/test.component';
import { ManagementComponent } from './_components/Management/management.component';

@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    VisionComponent,
    Grade9,
    Grade10,
    Grade11Component,
    Grade12Component,
    Others,
    ContactComponent,
    RegisterComponent,
    MessageComponent,
    ManagementComponent,
    TestComponent
  ],

  imports: [
    CarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

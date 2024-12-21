import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: any;

  owlOptions1: OwlOptions = {
    autoWidth: true,
    loop: true,
    margin: 2,
    autoplay: true,
    autoplayTimeout: 5000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false, //true,
    navSpeed: 1000,
    navText: ['<i class="fa fa-arrow-left fa-lg text-primary"></i>','<i class="fa fa-arrow-right fa-lg text-primary"></i>'],
    responsive: {
      0: {
        items: 1
      },
    },
  }

  owlOptions2: OwlOptions = {
    autoWidth: true,
    loop: true,
    margin: 40,
    autoplay: true,
    autoplayTimeout: 5000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false, //true,
    navSpeed: 1000,
    navText: ['<i class="fa fa-arrow-left fa-lg text-primary"></i>','<i class="fa fa-arrow-right fa-lg text-primary"></i>'],
    responsive: {
      0: {
        items: 0
      },
      1: {
        items: 1
      },
      2: {
        items: 2
      },
      3: {
        items: 3
      },
    },
  }

  constructor() { }

  ngOnInit(): void {
    this.title = environment.title;
  }

}

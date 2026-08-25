import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grade12',
  standalone: true,
  imports: [
    CommonModule,
    NgbModalModule
  ],
  templateUrl: './grade12.component.html',
  styleUrls: ['./grade12.component.css']
})
export class Grade12Component {

  selectedItem: any = null;

  closeResult = '';

  courses = [

    {
      source: 'courses',
      id: 0,
      code: 'ENG4U',
      subject: 'English',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 1,
      code: 'MFH4U',
      subject: 'Advanced Functions',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 2,
      code: 'MCV4U',
      subject: 'Calculus & Vectors',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 3,
      code: 'MDM4U',
      subject: 'Mathematics of Data Management',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 4,
      code: 'SPH4U',
      subject: 'Physics',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 5,
      code: 'SCH4U',
      subject: 'Chemistry',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 6,
      code: 'ICS4U',
      subject: 'Computer Science',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 7,
      code: 'SES4U',
      subject: 'Earth & Space Science',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 8,
      code: 'PSK4U',
      subject: 'Intro to Kinesiology',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 9,
      code: 'HFA4U',
      subject: 'Nutrition & Health',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 10,
      code: 'CGW4U',
      subject: 'Canadian & World Issues',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 11,
      code: 'CLN4U',
      subject: 'Canadian & International Law',
      credits: '1',
      grade: '12',
      pathway: 'University',
      description: '-'
    },

    {
      source: 'courses',
      id: 12,
      code: 'SBI4U',
      subject: 'Biology',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 13,
      code: 'BBB4M',
      subject: 'International Business Fundamentals',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 14,
      code: 'BOH4M',
      subject: 'Business Leadership: Management Fundamentals',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 15,
      code: 'HSC4M',
      subject: 'World Cultures',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 16,
      code: 'HIP4O',
      subject: 'Personal Life Management',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 17,
      code: 'HHS4C',
      subject: 'Families in Canada',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 18,
      code: 'MAP4C',
      subject: 'Foundations for College Mathematics',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 19,
      code: 'BAT4M',
      subject: 'Financial Accounting Principals',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 20,
      code: 'EWC4C',
      subject: 'Writers Craft',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    }

  ];


  constructor(
    private router: Router,
    private modalService: NgbModal
  ) {}


  ngOnInit(): void {
    // Initialization
  }


  open(content: any, item: any): void {

    this.selectedItem = item;

    this.modalService.open(content, {
      centered: true
    }).result.then(

      (result) => {

        this.closeResult =
          `Closed with: ${result}`;

      },

      (reason) => {

        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;

      }

    );

  }


  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    }

    if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    }

    return `with: ${reason}`;

  }

}
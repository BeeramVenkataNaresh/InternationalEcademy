import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  /*
   * =========================================================
   * DEFAULT COURSE IMAGE
   * =========================================================
   */

  readonly defaultCourseImage =
    'assets/images/general.JPG';


  /*
   * =========================================================
   * COURSES
   * =========================================================
   */

  courses = [

    {
      source: 'courses',
      id: 0,
      image: '0.jpg',
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
      image: '1.jpg',
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
      image: '2.jpg',
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
      image: '3.jpg',
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
      image: '4.jpg',
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
      image: '5.jpg',
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
      image: '6.jpg',
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
      image: '7.jpg',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
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
      image: '',
      code: 'EWC4C',
      subject: 'Writers Craft',
      credits: '1',
      grade: '12',
      pathway: '-',
      description: '-'
    }

  ];


  /*
   * =========================================================
   * CONSTRUCTOR
   * =========================================================
   */

  constructor(
    private modalService: NgbModal
  ) { }


  /*
   * =========================================================
   * IMAGE ERROR HANDLER
   * =========================================================
   *
   * If an actual course image does not exist,
   * replace it with the general image.
   */

  onImageError(event: Event): void {

    const image =
      event.target as HTMLImageElement;

    /*
     * Prevent an endless error loop if
     * the default image itself has a problem.
     */

    if (
      image.getAttribute('src') ===
      this.defaultCourseImage
    ) {
      return;
    }

    image.src =
      this.defaultCourseImage;

  }


  /*
   * =========================================================
   * OPEN COURSE MODAL
   * =========================================================
   */

  open(
    content: any,
    item: any
  ): void {

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


  /*
   * =========================================================
   * MODAL DISMISS REASON
   * =========================================================
   */

  private getDismissReason(
    reason: any
  ): string {

    if (
      reason === ModalDismissReasons.ESC
    ) {

      return 'by pressing ESC';

    }

    if (
      reason === ModalDismissReasons.BACKDROP_CLICK
    ) {

      return 'by clicking on a backdrop';

    }

    return `with: ${reason}`;

  }

}
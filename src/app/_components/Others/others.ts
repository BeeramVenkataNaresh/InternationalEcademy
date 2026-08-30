import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [
    CommonModule,
    NgbModalModule
  ],
  templateUrl: './others.html',
  styleUrls: ['./others.css']
})
export class Others {

  selectedItem: any = null;

  closeResult = '';


  // =========================================================
  // DEFAULT COURSE IMAGE
  // =========================================================

  readonly defaultCourseImage =
    'assets/images/general.JPG';


  // =========================================================
  // COURSES
  // =========================================================

  courses = [

    {
      source: 'courses',
      id: 0,
      code: 'ESLA',
      subject: 'English as a Second Language, Level A',
      credits: '1',
      grade: '-',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 1,
      code: 'ESLB',
      subject: 'English as a Second Language, Level B',
      credits: '1',
      grade: '-',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 2,
      code: 'ESLC',
      subject: 'English as a Second Language, Level C',
      credits: '1',
      grade: '-',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 3,
      code: 'ESLD',
      subject: 'English as a Second Language, Level D',
      credits: '1',
      grade: '-',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 4,
      code: 'ESLE',
      subject: 'English as a Second Language, Level E',
      credits: '1',
      grade: '-',
      pathway: '-',
      description: '-'
    },

    {
      source: 'courses',
      id: 5,
      code: 'OLC4O',
      subject: 'Ontario Secondary School Literacy Course',
      credits: '1',
      grade: '-',
      pathway: '-',
      description: '-'
    }

  ];


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    private modalService: NgbModal
  ) { }


  // =========================================================
  // IMAGE ERROR
  // =========================================================
  //
  // If the requested course image does not exist,
  // replace it with general.JPG.
  //
  // =========================================================

  onImageError(event: Event): void {

    const image =
      event.target as HTMLImageElement;


    // Prevent the browser from repeatedly
    // trying the broken image.
    image.onerror = null;


    // Replace with default image.
    image.src =
      this.defaultCourseImage;

  }


  // =========================================================
  // OPEN COURSE MODAL
  // =========================================================

  open(
    content: any,
    item: any
  ): void {

    this.selectedItem = item;


    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      scrollable: true
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


  // =========================================================
  // MODAL DISMISS REASON
  // =========================================================

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

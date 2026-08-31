import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grade9',
  standalone: true,
  imports: [
    CommonModule,
    NgbModalModule
  ],
  templateUrl: './grade9.html'
})
export class Grade9 {

  /* =========================================================
     SELECTED COURSE
  ========================================================= */

  selectedItem: any = null;

  closeResult = '';

  /* =========================================================
     GRADE 9 COURSES
     Image-related properties removed
  ========================================================= */

  courses = [

    /* =======================================================
       ENGLISH
    ======================================================= */

    {
      code: 'ENL1W',

      subject: 'English',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'This course is designed to develop the oral communication, reading, writing, and media literacy skills that students need for success in their secondary school academic programs and in their daily lives. Students will analyse literary texts from contemporary and historical periods, interpret informational and graphic texts, and create oral, written, and media texts in a variety of forms. An important focus will be on the use of strategies that contribute to effective communication. The course is intended to prepare students for the Grade 10 academic English course, which leads to university or college preparation courses in Grades 11 and 12.'
    },


    /* =======================================================
       MATHEMATICS
    ======================================================= */

    {
      code: 'MTH1W',

      subject: 'Principles Of Mathematics',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'This course enables students to develop an understanding of mathematical concepts related to algebra, analytic geometry, and measurement and geometry through investigation, the effective use of technology, and abstract reasoning. Students will investigate relationships, which they will then generalize as equations of lines, and will determine the connections between different representations of a linear relation. They will also explore relationships that emerge from the measurement of three-dimensional figures and two-dimensional shapes. Students will reason mathematically and communicate their thinking as they solve multi-step problems.'
    },


    /* =======================================================
       SCIENCE
    ======================================================= */

    {
      code: 'SNC1W',

      subject: 'Science',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'This course enables students to develop their understanding of basic concepts in biology, chemistry, earth and space science, and physics, and to relate science to technology, society, and the environment. Throughout the course, students will develop their skills in the processes of scientific investigation. Students will acquire an understanding of scientific theories and conduct investigations related to sustainable ecosystems; atomic and molecular structures and the properties of elements and compounds; the study of the universe and its properties and components; and the principles of electricity.'
    },


    /* =======================================================
       FRENCH
    ======================================================= */

    {
      code: 'FSF1D',

      subject: 'French',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'This course is designed to develop the oral communication, reading, writing, and media literacy skills that students need for success in their secondary school academic programs and in their daily lives. Students will analyse literary texts from contemporary and historical periods, interpret informational and graphic texts, and create oral, written, and media texts in a variety of forms. An important focus will be on the use of strategies that contribute to effective communication. The course is intended to prepare students for the Grade 10 academic English course, which leads to university or college preparation courses in Grades 11 and 12.'
    },


    /* =======================================================
       GEOGRAPHY
    ======================================================= */

    {
      code: 'CGC1W',

      subject: 'Geography',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'This course examines interrelationships within and between Canada’s natural and human systems and how these systems interconnect with those in other parts of the world. Students will explore environmental, economic, and social geographic issues relating to topics such as transportation options, energy choices, and urban development. Students will apply the concepts of geographic thinking and the geographic inquiry process, including spatial technologies, to investigate various geographic issues and to develop possible approaches for making Canada a more sustainable place in which to live.'
    },


    /* =======================================================
       HEALTHY ACTIVE LIVING EDUCATION
    ======================================================= */

    {
      code: 'PPL1O',

      subject: 'Healthy Active Living Education',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'This course equips students with the knowledge and skills they need to make healthy choices now and lead healthy, active lives in the future. Through participation in a wide range of physical activities, students develop knowledge and skills related to movement competence and personal fitness that provide a foundation for active living. Students also acquire an understanding of the factors and skills that contribute to healthy development and learn how their own well-being is affected by, and affects, the world around them. Students build their sense of self, learn to interact positively with others, and develop their ability to think critically and creatively.'
    },


    /* =======================================================
       VISUAL ARTS
    ======================================================= */

    {
      code: 'AVI1O',

      subject: 'Visual Arts',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'This course is exploratory in nature, offering an overview of visual arts as a foundation for further study. Students will become familiar with the elements and principles of design and the expressive qualities of various materials by using a range of media, processes, techniques, and styles. Students will use the creative and critical analysis processes and will interpret art within a personal, contemporary, and historical context. Prerequisite: None.'
    },


    /* =======================================================
       TECHNOLOGICAL EDUCATION
    ======================================================= */

    {
      code: 'TAS1O',

      subject: 'Technological Education',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'The Technology and the Skilled Trades course is a hands-on course designed to provide students with opportunities to further explore the engineering design process and develop technological knowledge and skills introduced in earlier grades. This course is organized into two broad areas of learning: 1. Design processes and related skills. 2. Technological development, impacts, and careers.'
    },


    /* =======================================================
       ENTREPRENEURIAL MINDSET
    ======================================================= */

    {
      code: 'BEM1O',

      subject: 'Building an Entrepreneurial Mindset',

      credits: '1',

      grade: '9',

      pathway: '-',

      description:
        'In this course, students will learn what makes an entrepreneur thrive and the skills required to succeed in today’s business environment. Students will begin to develop their own entrepreneurial mindset, and learn why it’s important to take initiative, adapt to change, find creative solutions, and understand the financial considerations of entrepreneurship. This hands-on course will use business software and applications to help students plan and develop their entrepreneurial ideas and learn how to present them to a target audience. Throughout the course, students will enhance their communication skills as well as develop and refine their project management skills.'
    },


    /* =======================================================
       LAUNCHING & LEADING A BUSINESS
    ======================================================= */

    {
      code: 'BEP2O',

      subject: 'Launching & Leading a Business',

      credits: '1',

      grade: '9',

      pathway: '-',

      description: '--'
    }

  ];


  /* =========================================================
     CONSTRUCTOR
  ========================================================= */

  constructor(
    private modalService: NgbModal
  ) {}


  /* =========================================================
     OPEN COURSE DETAILS MODAL
  ========================================================= */

  open(
    content: any,
    item: any
  ): void {

    this.selectedItem = item;

    this.modalService
      .open(
        content,
        {
          centered: true,
          size: 'lg',
          scrollable: true
        }
      )
      .result
      .then(

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


  /* =========================================================
     MODAL DISMISS REASON
  ========================================================= */

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
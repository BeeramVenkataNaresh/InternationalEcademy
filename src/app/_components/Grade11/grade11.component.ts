import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grade11',
  standalone: true,
  imports: [
    CommonModule,
    NgbModalModule
  ],
  templateUrl: './grade11.component.html',
  styleUrls: ['./grade11.component.css']
})
export class Grade11Component {

  /* =========================================================
     SELECTED COURSE
  ========================================================= */

  selectedItem: any = null;

  closeResult = '';

  noOfCols = 2;


  /* =========================================================
     GRADE 11 COURSES
  ========================================================= */

  courses = [
    {
      img: 0,
      source: 'courses',
      id: 0,
      code: 'ENG3U',
      subject: 'English',
      credits: '1',
      grade: '11',
      pathway: 'University',
      description:
        'This course emphasizes the development of literacy, communication, and critical and creative thinking skills necessary for success in academic and daily life. You will analyse challenging literary texts from various periods, countries, and cultures, as well as a range of informational and graphic texts, and create written and media texts in a variety of forms. An important focus will be on using language with precision and clarity and incorporating stylistic devices appropriately and effectively. The course is intended to prepare you for the compulsory Grade 12 university or college preparation course.'
    },

    {
      img: 1,
      source: 'courses',
      id: 1,
      code: 'MCR3U',
      subject: 'Functions and Applications',
      credits: '1',
      grade: '11',
      pathway: 'University',
      description:
        'This course introduces basic features of the function by extending your experiences with quadratic relations. It focuses on quadratic, trigonometric, and exponential functions and their use in modelling real-world situations. You will represent functions numerically, graphically, and algebraically; simplify expressions; solve equations; and solve problems relating to applications. You will reason mathematically and communicate your thinking as you solve multi-step problems.'
    },

    {
      img: 2,
      source: 'courses',
      id: 2,
      code: 'SPH3U',
      subject: 'Physics',
      credits: '1',
      grade: '11',
      pathway: 'University',
      description:
        'In this course, you will develop your understanding of the basic concepts of physics. You will explore kinematics, with an emphasis on linear motion; different kinds of forces; energy transformations; the properties of mechanical waves and sound; and electricity and magnetism. You will enhance your scientific investigation skills as you test laws of physics. In addition, you will analyze the interrelationships between physics and technology, and consider the impact of technological applications of physics on society and the environment.'
    },

    {
      img: 7,
      source: 'courses',
      id: 3,
      code: 'SCH3U',
      subject: 'Chemistry',
      credits: '1',
      grade: '11',
      pathway: 'University',
      description:
        'This course enables you to deepen your understanding of chemistry through the study of the properties of chemicals and chemical bonds; chemical reactions and quantitative relationships in those reactions; solutions and solubility; and atmospheric chemistry and the behaviour of gases. You will further develop your analytical skills and investigate the qualitative and quantitative properties of matter, as well as the impact of some common chemical reactions on society and the environment.'
    },

    {
      img: 5,
      source: 'courses',
      id: 4,
      code: 'SBI3U',
      subject: 'Biology',
      credits: '1',
      grade: '11',
      pathway: 'University',
      description:
        'This course furthers your understanding of the processes that occur in biological systems. You will study theory and conduct investigations in the areas of biodiversity; evolution; genetic processes; the structure and function of animals; and the anatomy, growth, and function of plants. This course focuses on the theoretical aspects of the topics under study, and will help you refine your skills related to scientific investigation.'
    },

    {
      img: 6,
      source: 'courses',
      id: 5,
      code: 'ICS3U',
      subject: 'Introduction to Computer Science',
      credits: '1',
      grade: '11',
      pathway: 'University',
      description:
        'It introduces students to computer science. This Curriculum Computer Science students design software independently and as part of a team, using industry-standard programming tools and applying the software development life-cycle model. They will write and use subprograms within computer programs, explore emerging research in computer science, and global career trends in computer-related fields.'
    },

    {
      img: 3,
      source: 'courses',
      id: 6,
      code: 'HSP3U',
      subject: 'Intro to Athropology, Psychology & Sociology',
      credits: '1',
      grade: '11',
      pathway: 'University',
      description:
        'HSP3U - Intro TO Athropology, Psychology & Sociology'
    },

    {
      img: 0,
      source: 'courses',
      id: 7,
      code: 'GWL3O',
      subject: 'Designing Your Future',
      credits: '1',
      grade: '11',
      pathway: '-',
      description: '--'
    },

    {
      img: 0,
      source: 'courses',
      id: 8,
      code: 'PPZ3C',
      subject: 'Health for Life',
      credits: '1',
      grade: '11',
      pathway: '-',
      description: '--'
    },

    {
      img: 0,
      source: 'courses',
      id: 9,
      code: 'BAF3M',
      subject: 'Financial Accounting Fundamentals',
      credits: '1',
      grade: '11',
      pathway: '-',
      description: '--'
    },

    {
      img: 0,
      source: 'courses',
      id: 10,
      code: 'EMS3O',
      subject: 'Media Studies',
      credits: '1',
      grade: '11',
      pathway: '-',
      description: '--'
    },

    {
      img: 0,
      source: 'courses',
      id: 11,
      code: 'MCF3M',
      subject: 'Functions and Applications',
      credits: '1',
      grade: '11',
      pathway: '-',
      description: '--'
    }
  ];


  /* =========================================================
     NORMAL COURSES
  ========================================================= */

  normalCourses = this.courses.filter(
    course => course.id <= 6
  );


  /* =========================================================
     OTHER / TABLE COURSES
  ========================================================= */

  tableCourses = this.courses.filter(
    course => course.id >= 7
  );


  /* =========================================================
     CONSTRUCTOR
  ========================================================= */

  constructor(
    private modalService: NgbModal
  ) {}


  /* =========================================================
     OPEN COURSE MODAL
  ========================================================= */

  open(content: any, item: any): void {

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


  /* =========================================================
     MODAL DISMISS REASON
  ========================================================= */

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

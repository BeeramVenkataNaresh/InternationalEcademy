import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, NgbModalModule],
  selector: 'app-education',
  styleUrl: './education.css',
  templateUrl: './education.html',
  animations: [
    trigger('pillPanel', [
      transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate('450ms ease-in-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('450ms ease-in-out', style({ height: 0, opacity: 0 })),
      ]),
    ]),
    trigger('pillCountryChange', [
      transition('* => *', [
        style({ opacity: 0.55 }),
        animate('160ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class Education {
  universityTabActiveIndex = 0;
  selectedPillCountryIndex = 0;
  selectedCourseGrade = 0;
  expandedDescriptionCode: string | null = null;
  selectedSampleCourse: any = null;

  readonly grade9Courses = [

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

  readonly grade10Courses = [

    {
      img: 0,
      source: 'courses',
      id: 0,
      code: 'ENG2D',
      subject: 'English',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course is designed to extend the range of oral communication, reading, writing, and media literacy skills that students need for success in their secondary school academic programs and in their daily lives. Students will analyze literary texts from contemporary and historical periods, interpret and evaluate informational and graphic texts, and create oral, written, and media texts in a variety of forms. An important focus will be on the selective use of strategies that contribute to effective communication. This course is intended to prepare students for the compulsory Grade 11 university or college preparation course.'
    },

    {
      img: 1,
      source: 'courses',
      id: 1,
      code: 'MPM2D',
      subject: 'Principles Of Mathematics',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course introduces basic features of the function by extending your experiences with quadratic relations. It focuses on quadratic, trigonometric, and exponential functions and their use in modelling real-world situations. You will represent functions numerically, graphically, and algebraically; simplify expressions; solve equations; and solve problems relating to applications. You will reason mathematically and communicate your thinking as you solve multi-step problems.'
    },

    {
      img: 2,
      source: 'courses',
      id: 2,
      code: 'SNC2D',
      subject: 'Science',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course enables students to enhance their understanding of concepts in biology, chemistry, earth and space science, and physics, and of the interrelationships between science, technology, society, and the environment. Students are also given opportunities to further develop their scientific investigation skills. Students will plan and conduct investigations and develop their understanding of scientific theories related to the connections between cells and systems in animals and plants; chemical reactions, with a particular focus on acid–base reactions; forces that affect climate and climate change; and the interaction of light and matter.'
    },

    {
      img: 4,
      source: 'courses',
      id: 3,
      code: 'CHC2D',
      subject: 'History',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course explores social, economic, and political developments and events and their impact on the lives of different individuals, groups, and communities, including First Nations, Métis, and Inuit individuals and communities, in Canada since 1914. Students will examine the role of conflict and cooperation in Canadian society, Canada’s evolving role within the global community, and the impact of various individuals, organizations, and events on identities, citizenship, and heritage in Canada. Students will develop an understanding of some of the political developments and government policies that have had a lasting impact on First Nations, Métis, and Inuit individuals and communities.'
    },

    {
      img: 6,
      source: 'courses',
      id: 4,
      code: 'BTT20',
      subject: 'Information And Communication Technology',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course introduces students to information and communication technology in a business environment and builds a foundation of digital literacy skills necessary for success in a technologically driven society. Students will develop word processing, spreadsheet, database, desktop publishing, presentation software, and website design skills. Throughout the course, there is an emphasis on digital literacy, effective electronic research and communication skills, and current issues related to the impact of information and communication technology.'
    },

    {
      img: 3,
      source: 'courses',
      id: 5,
      code: 'CHV2O',
      subject: 'Civics',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course explores rights and responsibilities associated with being an active citizen in a democratic society. Students will explore issues of civic importance such as healthy schools, community planning, environmental responsibility, and the influence of social media, while developing their understanding of the role of civic engagement and of political processes in the local, national, and/or global community. Students will apply the concepts of political thinking and the political inquiry process to investigate, and express informed opinions about, a range of political issues and developments that are both of significance in today’s world and of personal interest to them.'
    },

    {
      img: 3,
      source: 'courses',
      id: 6,
      code: 'GLC2O',
      subject: 'Career Studies',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course gives students the opportunity to develop the skills, knowledge, and habits that will support them in their education and career/life planning. Students will learn about global work trends, and seek opportunities within the school and community to expand and strengthen their transferable skills and their ability to adapt to the changing world of work. On the basis of exploration, reflective practice, and decision-making processes, students will make connections between their skills, interests, and values and their postsecondary options, whether in apprenticeship training, college, community living, university, or the workplace.'
    },

    {
      img: 4,
      source: 'courses',
      id: 7,
      code: 'BEP2O',
      subject: 'Launching and Leading a Business',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course introduces students to the world of business and what is required to be successful, ethical, and responsible in today’s economy. Students will develop the knowledge and skills needed to be an entrepreneur who knows how to respond to local and global market opportunities. Throughout the course, students will explore and understand the responsibility of managing different functions of a business. This includes accounting, marketing, information and communication technology, financial management, human resources, and production.'
    },

    {
      img: 6,
      source: 'courses',
      id: 8,
      code: 'TEJ2O',
      subject: 'Technological Education',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course introduces students to computer systems, networking, and interfacing, as well as electronics and robotics. Students will assemble, repair, and configure computers with various types of operating systems and application software. Students will build small electronic circuits and write computer programs to control simple peripheral devices or robots. Students will also develop an awareness of related environmental and societal issues, and will learn about secondary and postsecondary pathways and career opportunities in computer technology. Prerequisite: None'
    },

    {
      img: 3,
      source: 'courses',
      id: 9,
      code: 'AVI2O',
      subject: 'Visual Arts',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course enables students to develop their skills in producing and presenting art by introducing them to new ideas, materials, and processes for artistic exploration and experimentation. Students will apply the elements and principles of design when exploring the creative process. Students will use the critical analysis process to reflect on and interpret art within a personal, contemporary, and historical context. Prerequisite: None'
    },

    {
      img: 7,
      source: 'courses',
      id: 10,
      code: 'PPL2O',
      subject: 'Healthy Active Living Education',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course enables students to further develop the knowledge and skills they need to make healthy choices now and lead healthy, active lives in the future. Through participation in a wide range of physical activities, students develop knowledge and skills related to movement competence and personal fitness that provide a foundation for active living. Students also acquire an understanding of the factors and skills that contribute to healthy development and learn how their own well-being is affected by, and affects, the world around them. Students build their sense of self, learn to interact positively with others, and develop their ability to think critically and creatively.'
    },

    {
      img: 3,
      source: 'courses',
      id: 11,
      code: 'FSF2D',
      subject: 'French',
      credits: '1',
      grade: '10',
      pathway: '-',
      description:
        'This course enables students to increase their knowledge of the French language and further develop their language skills. Students will communicate about academic and personally relevant topics in real-life situations with increasing independence and fluency. They will continue to develop their skills in listening, speaking, reading, and writing in French, and will expand their understanding of the culture of Francophone communities in Canada and around the world. Emphasis is placed on developing language skills through active and creative use of French in a variety of contexts.'
    }

  ];

  readonly grade11Courses = [
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

  readonly grade12Courses = [

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

  readonly otherCourses = [

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

  courseGradeGroups = [
    { grade: '9', label: 'Grade 9', courses: this.grade9Courses },
    { grade: '10', label: 'Grade 10', courses: this.grade10Courses },
    { grade: '11', label: 'Grade 11', courses: this.grade11Courses },
    { grade: '12', label: 'Grade 12', courses: this.grade12Courses },
    { grade: 'others', label: 'Others', courses: this.otherCourses },
  ];

  constructor(private modalService: NgbModal) {}

  openSampleCourse(content: any, item: any): void {
    this.selectedSampleCourse = item;
    this.modalService.open(content, {
      centered: true,
      size: 'lg',
      scrollable: true,
      windowClass: 'education-course-modal-window',
    }).result.catch(() => undefined);
  }

  toggleCourseGrade(index: number): void {
    this.selectedCourseGrade = index;
    this.expandedDescriptionCode = null;
  }

  toggleCourseDescription(code: string): void {
    this.expandedDescriptionCode = this.expandedDescriptionCode === code ? null : code;
  }

  getCourseDescription(course: any): string {
    const description = course?.description?.trim();
    return description && description !== '-' && description !== '--'
      ? description
      : 'A course description is currently unavailable.';
  }

 countries = [

    {

      id: 'usa',

      name: 'USA',

      imageName: 'usa',

      color: '#9AE1F8',

      universities: [

        { name: "Massachusetts Institute of Technology (MIT)", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://mitadmissions.org/apply/firstyear/international/" },

        { name: "Stanford University", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://admission.stanford.edu/apply/international/index.html" },

        { name: "Harvard University", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://college.harvard.edu/admissions/apply/first-year-applicants" },

        { name: "California Institute of Technology", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://www.caltech.edu/" },

        { name: "University of Chicago", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://collegeadmissions.uchicago.edu/search/apply-application-secondaryschoolreport" },

        { name: "Princeton University", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://admission.princeton.edu/apply/international-students" },

        { name: "Cornell University", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://admissions.cornell.edu/how-to-apply/first-year-international-applicants" },

        { name: "Yale University", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://admissions.yale.edu/applying-yale-international-student" },

        { name: "Johns Hopkins University", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://apply.jhu.edu/how-to-apply/application-deadlines-and-requirements" },

        { name: "Columbia University", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://www.columbia.edu/" }

      ]

    },

    {

      id: 'canada',

      name: 'Canada',

      imageName: 'canada',

      color: '#90EE90',

      universities: [

        { name: "University of Toronto", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://future.utoronto.ca/academics/undergraduate-programs/" },

        { name: "McGill University", ossdRecognized: true, minEntry: "78-96.5", minEntryLink: "https://www.mcgill.ca/undergraduate-admissions/apply/requirements/ontario#grades" },

        { name: "University of British Columbia (UBC)", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://you.ubc.ca/programs/#mode=by-topic&viewMode=list" },

        { name: "University of Alberta", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://www.ualberta.ca/en/undergraduate-programs/index.html#sort=relevancy" },

        { name: "Université de Montréal", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://admission.umontreal.ca/en/studies/undergraduate-programs/" },

        { name: "McMaster University", ossdRecognized: true, minEntry: "75-95", minEntryLink: "https://future.mcmaster.ca/apply/requirements/" },

        { name: "University of Waterloo", ossdRecognized: true, minEntry: "80", minEntryLink: "https://uwaterloo.ca/undergraduate-admissions/admissions/admission-requirements" },

        { name: "The University of Western Ontario", ossdRecognized: true, minEntry: "83-93", minEntryLink: "https://welcome.uwo.ca/next-steps/requirements/" },

        { name: "The University of Ottawa", ossdRecognized: true, minEntry: "70", minEntryLink: "https://www.uottawa.ca/study/undergraduate-studies/program-prerequisites" },

        { name: "University of Calgary", ossdRecognized: true, minEntry: "70", minEntryLink: "https://www.ucalgary.ca/future-students/undergraduate/admissions/requirements" }

      ]

    },

    {

      id: 'australia',

      name: 'Australia',

      imageName: 'australia',

      color: '#FFFD55',

      universities: [

        { name: "The Australian National University (ANU)", ossdRecognized: true, minEntry: "77-96", minEntryLink: "https://www.anu.edu.au/files/resource/2018%20International%20Student%20Qualifications%20Table.pdf" },

        { name: "The University of New South Wales (UNSW)", ossdRecognized: true, minEntry: "75-88", minEntryLink: "https://www.international.unsw\\.edu.au/sites/default/files/2017_int_ug_direct_entry_table.pdf" },

        { name: "The University of Queensland (UQ)", ossdRecognized: true, minEntry: "60-80", minEntryLink: "https://study.uq.edu.au/admissions/undergraduate/review-entry-requirements" },

        { name: "The University of Sydney", ossdRecognized: true, minEntry: "72-91", minEntryLink: "https://www.sydney.edu.au/content/dam/corporate/documents/study/admissions/apply/entry-requirements/ug-academic-requirements/Sydney_Uni_Americas_Entry_Qualifications.pdf" },

        { name: "The University of Western Australia (UWA)", ossdRecognized: true, minEntry: "70", minEntryLink: "https://www.uwa.edu.au/study/how-to-apply/entry-requirements%20&%20https\\:/study.uwa.edu.au/how-to-apply/entry-requirements/international-and-overseas-qualifications/canadian-matriculation-except-quebec" },

        { name: "The University of Adelaide", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://www.adelaide.edu.au/degree-finder/?\_ga=2.214355991.1652114793.1518427153-1834300548.1518427153" },

        { name: "University of Technology, Sydney (UTS)", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://www.uts.edu.au/study/international/essential-information/academic-requirements#international-entry-scores" },

        { name: "University of Newcastle", ossdRecognized: true, minEntry: "49-89", minEntryLink: "https://www.newcastle.edu.au/study/international/study-with-us" },

        { name: "Curtin University", ossdRecognized: true, minEntry: "60", minEntryLink: "https://www.curtin.edu.au/study/undergraduate/" },

        { name: "Macquarie University", ossdRecognized: true, minEntry: "60-80", minEntryLink: "https://www.mq.edu.au/\_\_data/assets/pdf_file/0006/740481/2009128-Academic-Requirements-Tables_Mar21_UG-Single_FA_DIGITAL.pdf" }

      ]

    },

    {

      id: 'uk',

      name: 'UK',

      imageName: 'uk',

      color: '#F79D9D',

      universities: [

        { name: "University of Cambridge", ossdRecognized: true, minEntry: "90", minEntryLink: "https://www.undergraduate.study.cam.ac.uk/international-students/international-entry-requirements" },

        { name: "University of Oxford", ossdRecognized: true, minEntry: "85", minEntryLink: "https://www.ox.ac.uk/admissions/undergraduate/applying-to-oxford/for-international-students/international-qualifications?wssl=1" },

        { name: "Imperial College London", ossdRecognized: true, minEntry: "85-90", minEntryLink: "https://www.imperial.ac.uk/study/ug/apply/requirements/ugacademic/" },

        { name: "UCL (University College London)", ossdRecognized: true, minEntry: "83", minEntryLink: "https://www.ucl.ac.uk/prospective-students/international/user/login?destination=node/687" },

        { name: "The University of Manchester", ossdRecognized: true, minEntry: "80", minEntryLink: "https://www.manchester.ac.uk/study/international/country-specific-information/canada/entry-requirements/#country-profile" },

        { name: "King’s College London", ossdRecognized: true, minEntry: "83-90", minEntryLink: "https://www.kcl.ac.uk/study/undergraduate/apply/entry-requirements/international#C" },

        { name: "London School of Economics and Political Science", ossdRecognized: true, minEntry: "90-95", minEntryLink: "https://www.lse.ac.uk/study-at-lse/international-students/country-pages/canada" },

        { name: "University of Bristol", ossdRecognized: true, minEntry: "80-90", minEntryLink: "https://www.bristol.ac.uk/international/countries/canada.html#ugentryreqs" },

        { name: "The University of Warwick", ossdRecognized: true, minEntry: "70-85", minEntryLink: "https://warwick.ac.uk/study/international/admissions/entry-requirements/#c" },

        { name: "University of Southampton", ossdRecognized: true, minEntry: "81", minEntryLink: "https://www.southampton.ac.uk/uni-life/international/your-country/north-america/canada.page" }

      ]

    },

    {

      id: 'hongkong',

      name: 'Hong Kong',

      imageName: 'hongkong',

      color: '#D3D3D3',

      universities: [

        { name: "The University of Hong Kong", ossdRecognized: true, minEntry: "90", minEntryLink: "https://aal.hku.hk/admissions/international/admissions-information?page=admissions-standards" },

        { name: "The Chinese University of Hong Kong", ossdRecognized: true, minEntry: "80", minEntryLink: "https://admission.cuhk.edu.hk/application/overseas-other-qualifications-non-local-international-team/requirements/" },

        { name: "The Hong Kong University of Science and Technology", ossdRecognized: true, minEntry: "85", minEntryLink: "https://join.hkust.edu.hk/admissions/international-qualifications#canadian-patterned" },

        { name: "City University of Hong Kong", ossdRecognized: true, minEntry: "70", minEntryLink: "http://www.admo.cityu.edu.hk/intl/international/entreq/" },

        { name: "The Hong Kong Polytechnic University", ossdRecognized: true, minEntry: "75", minEntryLink: "https://www.polyu.edu.hk/study/ug/admissions/international-other-qualifications/general-entrance-requirements" },

        { name: "Hong Kong Baptist University", ossdRecognized: true, minEntry: "70", minEntryLink: "https://admissions.hkbu.edu.hk/uploads/en/download/pdf/Year-1-Admissions-2018.pdf" },

        { name: "Lingnan University", ossdRecognized: true, minEntry: "70", minEntryLink: "https://www.ln.edu.hk/admissions/ug/f/upload/186/General_Admission_Requirements.pdf" },

        { name: "The Education University of Hong Kong", ossdRecognized: true, minEntry: "70", minEntryLink: "https://www.eduhk.hk/degree/app_non_local.htm#can" },

        { name: "Hong Kong Metropolitan University", ossdRecognized: true, minEntry: "70", minEntryLink: "https://admissions.hkmu.edu.hk/" },

        { name: "Hong Kong Shue Yan University", ossdRecognized: true, minEntry: "70", minEntryLink: "https://uao.hksyu.edu/en/admission/qualification" }

      ]

    }

  ];

  get selectedPillCountry() {
    return this.countries[this.selectedPillCountryIndex] ?? null;
  }

  universities = [

    { src: 'assets/images/universites/york.jpg', name: 'York University' },

    { src: 'assets/images/universites/waterloo.jpg', name: 'University of Waterloo' },

    { src: 'assets/images/universites/toronto.jpg', name: 'University of Toronto' },

    { src: 'assets/images/universites/torontometropolitan.jpg', name: 'Toronto Metropolitan University' },

    { src: 'assets/images/universites/ontariotech.jpg', name: 'Ontario Tech University' },

    { src: 'assets/images/universites/mcmaster.jpg', name: 'McMaster University' },

    { src: 'assets/images/universites/western.jpg', name: 'Western University' },

    { src: 'assets/images/universites/ryerson.jpg', name: 'Ryerson University' },

    { src: 'assets/images/universites/queens.jpg', name: "Queen's University" },

    { src: 'assets/images/universites/mcgill.jpg', name: 'McGill University' },

    { src: 'assets/images/universites/guelph.jpg', name: 'University of Guelph' }

  ];
}

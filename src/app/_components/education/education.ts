import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { Grade9 } from '../Grade9/grade9';
import { Grade10 } from '../Grade10/grade10';
import { Grade11Component } from '../Grade11/grade11.component';
import { Grade12Component } from '../Grade12/grade12.component';
import { Others } from '../Others/others';

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
  selectedPillCountryIndex = -1;
  selectedCourseGrade = -1;
  expandedDescriptionCode: string | null = null;
  selectedSampleCourse: any = null;

  courseGradeGroups = [
    { grade: '9', label: 'Grade 9', courses: Grade9.catalogCourses },
    { grade: '10', label: 'Grade 10', courses: Grade10.catalogCourses },
    { grade: '11', label: 'Grade 11', courses: Grade11Component.catalogCourses },
    { grade: '12', label: 'Grade 12', courses: Grade12Component.catalogCourses },
    { grade: 'others', label: 'Others', courses: Others.catalogCourses },
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
    this.selectedCourseGrade = this.selectedCourseGrade === index ? -1 : index;
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

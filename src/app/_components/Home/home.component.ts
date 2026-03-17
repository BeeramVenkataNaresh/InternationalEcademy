import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: any;
  closeResult: any;
  universityTabActiveIndex = 0;
  courseTabActive = 'courses';

  owlMain: OwlOptions = {
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
    navText: ['<i class="fa fa-arrow-left fa-lg text-primary"></i>', '<i class="fa fa-arrow-right fa-lg text-primary"></i>'],
    responsive: {
      0: {
        items: 1
      },
    },
  }

  owlTestimonials: OwlOptions = {
    autoWidth: true,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false, //true,
    navSpeed: 1000,
    navText: ['<i class="fa fa-arrow-left fa-lg text-primary"></i>', '<i class="fa fa-arrow-right fa-lg text-primary"></i>'],
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
    },
  }

  owlAdmissions: OwlOptions = {
    autoWidth: true,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false, //true,
    navSpeed: 1000,
    navText: ['<i class="fa fa-arrow-left fa-lg text-primary"></i>', '<i class="fa fa-arrow-right fa-lg text-primary"></i>'],
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
      }
    },
  }

  owlPartnerships: OwlOptions = {
    autoWidth: true,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 5000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false, //true,
    navSpeed: 1000,
    navText: ['<i class="fa fa-arrow-left fa-lg text-primary"></i>', '<i class="fa fa-arrow-right fa-lg text-primary"></i>'],
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
      }
    },
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
        { name: "The University of New South Wales (UNSW)", ossdRecognized: true, minEntry: "75-88", minEntryLink: "https://www.international.unsw.edu.au/sites/default/files/2017_int_ug_direct_entry_table.pdf" },
        { name: "The University of Queensland (UQ)", ossdRecognized: true, minEntry: "60-80", minEntryLink: "https://study.uq.edu.au/admissions/undergraduate/review-entry-requirements" },
        { name: "The University of Sydney", ossdRecognized: true, minEntry: "72-91", minEntryLink: "https://www.sydney.edu.au/content/dam/corporate/documents/study/admissions/apply/entry-requirements/ug-academic-requirements/Sydney_Uni_Americas_Entry_Qualifications.pdf" },
        { name: "The University of Western Australia (UWA)", ossdRecognized: true, minEntry: "70", minEntryLink: "https://www.uwa.edu.au/study/how-to-apply/entry-requirements%20&%20https:/study.uwa.edu.au/how-to-apply/entry-requirements/international-and-overseas-qualifications/canadian-matriculation-except-quebec" },
        { name: "The University of Adelaide", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://www.adelaide.edu.au/degree-finder/?_ga=2.214355991.1652114793.1518427153-1834300548.1518427153" },
        { name: "University of Technology, Sydney (UTS)", ossdRecognized: true, minEntry: "Find", minEntryLink: "https://www.uts.edu.au/study/international/essential-information/academic-requirements#international-entry-scores" },
        { name: "University of Newcastle", ossdRecognized: true, minEntry: "49-89", minEntryLink: "https://www.newcastle.edu.au/study/international/study-with-us" },
        { name: "Curtin University", ossdRecognized: true, minEntry: "60", minEntryLink: "https://www.curtin.edu.au/study/undergraduate/" },
        { name: "Macquarie University", ossdRecognized: true, minEntry: "60-80", minEntryLink: "https://www.mq.edu.au/__data/assets/pdf_file/0006/740481/2009128-Academic-Requirements-Tables_Mar21_UG-Single_FA_DIGITAL.pdf" }
      ]
    },
    {
      id: 'uk',
      name: 'United Kingdom',
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

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.title = environment.title;
  }

  open(content: any) {
    this.modalService.open(content, { centered: true, size: 'md' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`; // size types - 'sm', 'md','lg','xl'
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

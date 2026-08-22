import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    NgbModalModule
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  selectedItem: any[] = [];
  closeResult = '';
  noOfCols = 3;

  staff = [
    {
      source: 'courses',
      id: '0',
      name: 'Mr. Sample Xyz',
      job: 'Position',
      qualification: '(B.Sc, B.Ed., M.Ed.,)',
      about: 'About Their Information & Experience..! etc.'
    },
    {
      source: 'courses',
      id: '1',
      name: 'Mr. Sample Xyz',
      job: 'Position',
      qualification: '(B.Sc, B.Ed., M.Ed.,)',
      about: 'About Their Information & Experience..! etc.'
    },
    {
      source: 'courses',
      id: '2',
      name: 'Mr. Sample Xyz',
      job: 'Position',
      qualification: '(B.Sc, B.Ed., M.Ed.,)',
      about: 'About Their Information & Experience..! etc.'
    },
    {
      source: 'courses',
      id: '3',
      name: 'Mr. Sample Xyz',
      job: 'Position',
      qualification: '(B.Sc, B.Ed., M.Ed.,)',
      about: 'About Their Information & Experience..! etc.'
    },
    {
      source: 'courses',
      id: '4',
      name: 'Mr. Sample Xyz',
      job: 'Position',
      qualification: '(B.Sc, B.Ed., M.Ed.,)',
      about: 'About Their Information & Experience..! etc.'
    },
    {
      source: 'courses',
      id: '5',
      name: 'Mr. Sample Xyz',
      job: 'Position',
      qualification: '(B.Sc, B.Ed., M.Ed.,)',
      about: 'About Their Information & Experience..! etc.'
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
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-others',
  templateUrl: './others.html',
  styleUrls: ['./others.css'],
})
export class Others {
selectedItem: any[];
  closeResult: string;
  courses = [
    { source: 'courses', id: 0, code: 'ESLA', subject: 'English as a Second Language, Level A', credits: '1', grade: '-', pathway: '-', description: '-' },
    { source: 'courses', id: 1, code: 'ESLB', subject: 'English as a Second Language, Level B', credits: '1', grade: '-', pathway: '-', description: '-' },
    { source: 'courses', id: 2, code: 'ESLC', subject: 'English as a Second Language, Level C', credits: '1', grade: '-', pathway: '-', description: '-' },
    { source: 'courses', id: 3, code: 'ESLD', subject: 'English as a Second Language, Level D', credits: '1', grade: '-', pathway: '-', description: '-' },
    { source: 'courses', id: 4, code: 'ESLE', subject: 'English as a Second Language, Level E', credits: '1', grade: '-', pathway: '-', description: '-' },
    { source: 'courses', id: 5, code: 'OLC4O', subject: 'Ontario Secondary School  Literacy Course', credits: '1', grade: '-', pathway: '-', description: '-' },
  ];

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content, item) {
    this.selectedItem = item;
    this.modalService.open(content, { centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  selectedItem: any[];
  closeResult: string;
  noOfCols = 3;
  staff = [
                {source:'staff',id:'0', name:'Nazzareno Fiscaletti', job:'Principal', qualification:'(B.Sc, B.Ed., M.Ed., OCT)', about:'About Their Information & Experience..! etc.'},
                {source:'staff',id:'1', name:'Michael Mastragostino', job:'Director of Operations', qualification:'(B.A., B.Ed., M.Ed., OCT)', about:'About Their Information & Experience..! etc.'},              
                {source:'staff',id:'2', name:'Laura Fiscaletti', job:'Director of Operations', qualification:'(B.A)', about:'About Their Information & Experience..! etc.'},
                {source:'staff',id:'3', name:'Paul Mamiani', job:'Instructor', qualification:'(B.A., B.Ed., OCT)', about:'About Their Information & Experience..! etc.'},
                {source:'staff',id:'4', name:'Victor J. Paluck', job:'Instructor', qualification:'(B.A., B.Ed)', about:'About Their Information & Experience..! etc.'},
                {source:'staff',id:'5', name:'Christina D’ Ammizio', job:'Instructor', qualification:'(B.A., B.Ed., OCT)', about:'About Their Information & Experience..! etc.'},
                {source:'staff',id:'6', name:'Ezio Crescenzi', job:'Board Of Directors', qualification:'(-)', about:'About Their Information & Experience..! etc.'},
                {source:'staff',id:'7', name:'Adelina Wong', job:'Board Of Directors', qualification:'(R. Ph., B. Sc. Phm)', about:'About Their Information & Experience..! etc.'}
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

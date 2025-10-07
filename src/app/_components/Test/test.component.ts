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
                {source:'courses',id:'0', name:'Mr. Sample Xyz', job:'Position', qualification:'(B.Sc, B.Ed., M.Ed.,)', about:'About Their Information & Experience..! etc.'},
                {source:'courses',id:'1', name:'Mr. Sample Xyz', job:'Position', qualification:'(B.Sc, B.Ed., M.Ed.,)', about:'About Their Information & Experience..! etc.'},
                {source:'courses',id:'2', name:'Mr. Sample Xyz', job:'Position', qualification:'(B.Sc, B.Ed., M.Ed.,)', about:'About Their Information & Experience..! etc.'},
                {source:'courses',id:'3', name:'Mr. Sample Xyz', job:'Position', qualification:'(B.Sc, B.Ed., M.Ed.,)', about:'About Their Information & Experience..! etc.'},
                {source:'courses',id:'4', name:'Mr. Sample Xyz', job:'Position', qualification:'(B.Sc, B.Ed., M.Ed.,)', about:'About Their Information & Experience..! etc.'},
                {source:'courses',id:'5', name:'Mr. Sample Xyz', job:'Position', qualification:'(B.Sc, B.Ed., M.Ed.,)', about:'About Their Information & Experience..! etc.'},
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

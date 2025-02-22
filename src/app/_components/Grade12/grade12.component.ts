import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grade12',
  templateUrl: './grade12.component.html',
  styleUrls: ['./grade12.component.css']
})
export class Grade12Component {
  selectedItem: any[];
   closeResult: string;
   courses = [
                 {source:'courses',id:'0', code:'ENG4U', subject:'English', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'1', code:'MFH4U', subject:'Advanced Functions', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'2', code:'MCV4U', subject:'Calculus & Vectors', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'3', code:'MDM4U', subject:'Mathematics of Data Management', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'4', code:'SPH4U', subject:'Physics', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'5', code:'SCH4U', subject:'Chemistry', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'6', code:'ICS4U', subject:'Computer Science', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'7', code:'SES4U', subject:'Earth & Space Science', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'8', code:'PSK4U', subject:'Intro to Kinesiology', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'9', code:'HFA4U', subject:'Nutrition & Health', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'10', code:'CGW4U', subject:'Canadian & World Issues', credits:'1', grade: '12', pathway: 'University', description:'-'},
                 {source:'courses',id:'11', code:'CLN4U', subject:'Canadian & International Law', credits:'1', grade: '12', pathway: 'University', description:'-'},
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

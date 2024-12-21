import { Component } from '@angular/core';

@Component({
  selector: 'app-grade12',
  templateUrl: './grade12.component.html',
  styleUrls: ['./grade12.component.css']
})
export class Grade12Component {
  showEnglish = false;

  fnEnglishShow() {
    this.showEnglish = true;
  }

  fnClose() {
    this.showEnglish = false;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-grade11',
  templateUrl: './grade11.component.html',
  styleUrls: ['./grade11.component.css']
})
export class Grade11Component {
  showEnglish = false;

  fnEnglishShow() {
    this.showEnglish = true;
  }

  fnClose() {
    this.showEnglish = false;
  }

}

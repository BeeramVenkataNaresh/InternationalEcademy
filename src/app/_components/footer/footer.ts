import {
  Component
} from '@angular/core';

import {
  MessageComponent
} from '../Message/message.component';


@Component({
  selector: 'app-footer',

  standalone: true,

  imports: [
    MessageComponent
  ],

  templateUrl: './footer.html',

  styleUrls: ['./footer.css']
})
export class FooterComponent {

  year = new Date().getFullYear();

  title = 'International Ecademy';

}
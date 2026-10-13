import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  scrollToServices(event: Event): void {
    event.preventDefault();
    document.getElementById('home-services')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

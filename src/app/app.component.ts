import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  // standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showBackButton: boolean = true;
  currentUrl: string = '';

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.showBackButton = (event.url !== '/') && (event.url !== '/login'); 
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateback() {
    if (this.currentUrl === '/no-items') {
      this.router.navigate(['/admin']); // Redirect to admin page
    } else {
      this.location.back(); // Default behavior
    }
  }
}

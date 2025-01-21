import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showBackButton: boolean = true;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showBackButton = event.url !== '/'; 
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateback() {
    this.location.back();
  }
}

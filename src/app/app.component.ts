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
  accessType:any;
  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.showBackButton = (event.url !== '/') && (event.url !== '/login') && (event.url !== '/loggedOut'); 
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateback() {
    if (this.currentUrl === '/admin/no-items') {
      this.router.navigate(['/admin']); // Redirect to admin page
    } else if(this.currentUrl === '/loggedOut') {
      this.router.navigate(['/']);
    } else if(this.currentUrl === '/restricted') {
      this.accessType = sessionStorage.getItem('accessType');
        if(this.accessType == '"Customer"')
          this.router.navigate(['/customer']);
        else if(this.accessType == '"Item-Only"')
          this.router.navigate(['/admin']);
        else if(this.accessType == '"Category-Only"')
          this.router.navigate(['/admin/view-category']);
    }
     else {
      this.location.back(); // Default behavior
    }
  }
}

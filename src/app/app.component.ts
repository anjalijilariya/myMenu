import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private router: Router) { }

  navigateToHome() {
    this.router.navigate(['/']);
}
navigateback() {
  this.router.navigate(['../']);
}

  
}

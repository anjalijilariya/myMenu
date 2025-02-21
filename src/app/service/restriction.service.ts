import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RestrictionService {

  constructor(private router:Router) { }

  accessType:string;

  restrict(page: string) {
    
    this.accessType = localStorage.getItem('accessType');
    if(((this.accessType === 'Category-only' || this.accessType ==='') && page === 'admin') || 
    ((this.accessType === 'Category-only' || this.accessType ==='') && page === 'view-items') ||
    ((this.accessType === 'Item-Only' || this.accessType ==='') && page === 'view-category'))
    {
      this.router.navigate(['/restricted']);
    }
      
  }
}

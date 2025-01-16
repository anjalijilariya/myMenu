import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{

  cat: any = 'food';

  constructor(private router: Router) {} // Inject Router into constructor

  ngOnInit(): void {}

  Change(event: Event): void {
    var vari = event.target as HTMLElement;
    this.cat = vari.innerHTML.toLowerCase(); // Get the selected category
    console.log(this.cat);
    // Get the stored listData from sessionStorage
    const storedData = sessionStorage.getItem('listData');
    //console.log(storedData.indexOf('chocolate'));

    if (storedData) {
      const parsedData = JSON.parse(storedData); // Parse the stored data into an array of objects
      
      // Filter and count the elements with category equal to this.cat
      const count = parsedData.filter(item => item.category.toLowerCase() === this.cat).length;

      console.log('Count of items with category', this.cat, ':', count);
      console.log(storedData);

      // If count is greater than 0, navigate to menu page, else navigate to error page
      if (count > 0) {
        this.router.navigate(['/menu'], { queryParams: { category: this.cat } });
      } else {
        this.router.navigate(['/error'], { queryParams: { category: this.cat } });
      }
    }
    
    // Store the selected category in sessionStorage
    sessionStorage.setItem('cat', JSON.stringify(this.cat));
  }
}

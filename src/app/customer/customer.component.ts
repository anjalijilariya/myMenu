import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  // standalone: false,
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state('active', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('inactive', style({
        opacity: 0,
        transform: 'scale(0.95)'
      })),
      transition('inactive => active', animate('500ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class CustomerComponent implements OnInit{

  cat: any = 'Food';
  currentIndex = 0;
  listData: any[] = [];
  categoryTypes: string[] = [];

  images = [
    {
      url: '../assets/sahibaa9.webp',
      title: 'Special Dish 1',
      description: 'Delicious signature dish'
    },
    {
      url: '../assets/sahibaa8.jpg',
      title: 'Special Dish 2',
      description: 'Chef\'s recommendation'
    },
    {
      url: '../assets/sahibaa7.jpg',
      title: 'Special Dish 3',
      description: 'Popular choice'
    },
    {
      url: '../assets/sahibaa6.jpg',
      title: 'Special Dish 4',
      description: 'Seasonal special'
    },
    {
      url: '../assets/sahibaa5.jpg',
      title: 'Special Dish 5',
      description: 'Customer favorite'
    }
  ];
  
  constructor(private router: Router) {} // Inject Router into constructor

  ngOnInit() {
    setInterval(() => {
      this.navigate('next');
    }, 3000);
    const storedData = sessionStorage.getItem('listData');
    if (storedData) {
      this.listData = JSON.parse(storedData);
      console.log(this.listData);
    }
    const categoryData = sessionStorage.getItem('categoryTypes'); // Get stored categories
    console.log(categoryData);

    if (!categoryData || JSON.parse(categoryData).length === 0) {
      // If no categories exist in storage or categoryTypes is empty, set default categories
      const defaultCategories = ['beverages', 'dessert', 'food'];
      this.categoryTypes = defaultCategories;
      sessionStorage.setItem('categoryTypes', JSON.stringify(defaultCategories));
      console.log('Initialized with default categories:', this.categoryTypes);
    } else {
      // If categories exist in storage, use those
      this.categoryTypes = JSON.parse(categoryData)
        .map((category: string) => category.toLowerCase())
        .sort();
      console.log('Using stored categories:', this.categoryTypes);
    }


  }

  Change(event: Event): void {
    const button = event.target as HTMLElement;
    this.cat = button.textContent?.trim().toLowerCase() || '';
    console.log(this.cat);
    const storedData = sessionStorage.getItem('listData');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      const count = parsedData.filter(item => item.category.toLowerCase() === this.cat.toLowerCase()).length;

      console.log('Count of items with category', this.cat, ':', count);
      console.log(storedData);

      if (count > 0) {
        this.router.navigate(['/customer/menu'], { queryParams: { category: this.cat } });
      } else {
        this.router.navigate(['/error']);
      }
    }
    else {
      this.router.navigate(['/error']);
    }
    
    sessionStorage.setItem('cat', JSON.stringify(this.cat));
  }

  navigate(direction: 'prev' | 'next') {
    if (direction === 'prev') {
      this.currentIndex = this.currentIndex === 0 ? 
        this.images.length - 1 : this.currentIndex - 1;
    } else {
      this.currentIndex = this.currentIndex === this.images.length - 1 ? 
        0 : this.currentIndex + 1;
    }
  }

  setActive(index: number) {
    this.currentIndex = index;
  }

  gotoLink() {
    window.open('https://mdbootstrap.com/', '_blank');
  }

}

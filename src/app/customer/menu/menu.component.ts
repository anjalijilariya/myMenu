import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // standalone: false,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit{

   listData: any[] = [];
   cat = 'food';
   heading : string;
   displayedColumns: string[] = ['no', 'name', 'price'];
   loggedIn: any;

   constructor(private router: Router) {}

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('listData');
    if (storedData) {
      this.listData = JSON.parse(storedData);
      console.log(this.listData);
    }

    const category = sessionStorage.getItem('cat');
    console.log(category);
    if(category){
      this.cat = JSON.parse(category);
    }

    if (this.cat) {
      this.listData = this.listData.filter(item => item.category.toLowerCase() === this.cat.toLowerCase());
    }
    this.loggedIn = sessionStorage.getItem('loggedIn');
    console.log(this.loggedIn);

    if(this.loggedIn === 'false')
      this.router.navigate(['/loggedOut']);
    this.heading = this.cat.toUpperCase();
  }

}

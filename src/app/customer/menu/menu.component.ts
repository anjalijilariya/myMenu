import { Component, OnInit } from '@angular/core';

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

   constructor() {}

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

    this.heading = this.cat.toUpperCase();
  }

}

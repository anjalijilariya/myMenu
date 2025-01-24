import { Component, OnInit } from '@angular/core';

@Component({
  // standalone: false,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

   listData: any[] = [];
   cat = 'food';
   heading : string;

   constructor() {}

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('listData');
    if (storedData) {
      this.listData = JSON.parse(storedData);
    }

    const category = sessionStorage.getItem('cat');
    if(category){
      this.cat = JSON.parse(category);
    }

    if (this.cat) {
      this.listData = this.listData.filter(item => item.category === this.cat);
    }

    this.heading = this.cat.toUpperCase();
  }

  displayedColumns: string[] = ['name', 'price'];

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  listData: any[] = [];
  cat = 'food';

  constructor() {}

  ngOnInit(): void {
    // Load stored data from sessionStorage if available
    const storedData = sessionStorage.getItem('listData');
    if (storedData) {
      this.listData = JSON.parse(storedData);
    }

    const category = sessionStorage.getItem('cat');
    if(category){
      this.cat = JSON.parse(category);
    }
  }

}

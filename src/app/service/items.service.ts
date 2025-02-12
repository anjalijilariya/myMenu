import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  listData: any[] = [];

  constructor() { }

  addData(data: any) {
    this.listData.push(data);
    sessionStorage.setItem('listData', JSON.stringify(this.listData));
  }

  updateData(data: any, index: number) {
    this.listData[index] = data;
    sessionStorage.setItem('listData', JSON.stringify(this.listData));
  }

  deleteData(index: number, type: string, storeTo: any) {
    storeTo.splice(index, 1);
    sessionStorage.setItem(type, JSON.stringify(storeTo));
    
  }

  getData() {
    this.listData = JSON.parse(sessionStorage.getItem('listData') || '[]');
    return this.listData;
  }

  sortListData(list:any, cat:any): void {
    list.sort((a, b) => {
      // Get the index of each category in categoryTypes
      const indexA = cat.indexOf(a.category.toLowerCase());
      const indexB = cat.indexOf(b.category.toLowerCase());
      
      // Sort by category index
      if (indexA !== indexB) {
        return indexA - indexB;
      }
      
    });
  }
}

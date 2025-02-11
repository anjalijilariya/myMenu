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

  deleteData(index: number) {
    this.listData.splice(index, 1);
    sessionStorage.setItem('listData', JSON.stringify(this.listData));
  }

  getData() {
    this.listData = JSON.parse(sessionStorage.getItem('listData') || '[]');
    return this.listData;
  }

  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userForm: FormGroup;
  listData: any[] = [];
  catlist = ['beverages', 'dessert', 'food'];
  isEditMode: boolean = false; 
  editIndex: number = -1; 

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('listData');
    if (storedData) {
      this.listData = JSON.parse(storedData);
      this.sortListData(); 
    }
  }

  public addItem(): void {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.listData[this.editIndex] = this.userForm.value;
        this.isEditMode = false; 
        this.editIndex = -1;
      } else {
        this.listData.push(this.userForm.value);
      }
      this.sortListData();
      sessionStorage.setItem('listData', JSON.stringify(this.listData));
      this.userForm.reset();
    } else {
      alert('All fields are necessary to be filled!');
    }
  }

  public editItem(item: any): void {
    this.isEditMode = true; 
    this.editIndex = this.listData.indexOf(item); 

    this.userForm.patchValue({
      name: item.name,
      category: item.category,
      price: item.price,
      desc: item.desc
    });
  }

  reset(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.editIndex = -1; 
  }

  removeItem(element: any): void {
    this.listData.forEach((value, index) => {
      if (value === element) {
        this.listData.splice(index, 1);

        sessionStorage.setItem('listData', JSON.stringify(this.listData));
      }
    });
  }

  private sortListData(): void {
    this.listData.sort((a, b) => {
      return this.catlist.indexOf(a.category) - this.catlist.indexOf(b.category);
    });
  }
}


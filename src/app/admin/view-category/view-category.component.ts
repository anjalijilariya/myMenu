import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  //constructor() { }
  userForm: FormGroup;
  listData: any[] = [];
  // catlist = ['beverages', 'dessert', 'food'];
  isEditMode: boolean = false; 
  head = 'Add';
  editIndex: number = -1; 
  categoryTypes: string[] = ['Food', 'Beverages', 'Dessert'];

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedCategories = sessionStorage.getItem('categoryTypes');
    if (!storedCategories) {
      // If no categories in storage, store the default ones
      sessionStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
    } else {
      // If categories exist in storage, load them
      this.categoryTypes = JSON.parse(storedCategories);
    }
    const storedData = sessionStorage.getItem('listData');
    if (storedData) {
      this.listData = JSON.parse(storedData);
      this.sortListData(); 
      // console.log(this.listData);
    }

  }

  AddCategory() {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        // console.log(this.editIndex, this.categoryTypes[this.editIndex], this.userForm.value.name);
        // console.log(this.listData);
        this.listData.forEach((value) => {
          // console.log(value.category, this.categoryTypes[this.editIndex]);
          if (value.category == this.categoryTypes[this.editIndex].toLowerCase()) {
            value.category = this.userForm.value.name;
            // console.log(value);
            // console.log(this.listData);
            sessionStorage.setItem('listData', JSON.stringify(this.listData));
          }
        });

        this.categoryTypes[this.editIndex] = this.userForm.value.name;
        this.isEditMode = false; 
        this.editIndex = -1;
      } else {
        const newCategory = this.userForm.get('name')?.value;
        if (newCategory && !this.categoryTypes.includes(newCategory)) {
          this.categoryTypes.push(newCategory);
          // console.log('Categories:', this.categoryTypes);
        }
      }
      sessionStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
      this.head = 'Add';
      this.reset();
      // console.log('Categories:', this.categoryTypes);
    }
  }

  reset(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.editIndex = -1; 
    this.head = 'Add';
  }

  public editItem(item: any): void {
    this.head = 'Edit';
    this.isEditMode = true; 
    this.editIndex = this.categoryTypes.indexOf(item.category); 
    this.userForm.patchValue({
      name: item.category,
    });
  }

  removeItem(element: any): void {

    this.listData.forEach((value, index) => {
      if (value.category === element.category) {
        this.listData.splice(index, 1);

        sessionStorage.setItem('listData', JSON.stringify(this.listData));
      }
    });

    this.categoryTypes.forEach((value, index) => {
      if (value === element.category) {
        this.categoryTypes.splice(index, 1);

        sessionStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
      }
    });

  }

  getCategoriesWithCounts(): { category: string, itemCount: number }[] {
    
    const buf =  this.categoryTypes
      .map(category => ({
        category: category,
        itemCount: this.listData.filter(item => 
          item.category.toLowerCase() === category.toLowerCase()
        ).length
      }))
      .sort((a, b) => a.category.localeCompare(b.category));

      // console.log(buf);
      return buf;
  }


  private sortListData(): void {
    this.listData.sort((a, b) => {
      return this.categoryTypes.indexOf(a.category) - this.categoryTypes.indexOf(b.category);
    });
  }


}

 
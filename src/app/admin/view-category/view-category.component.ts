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
    const storedData = sessionStorage.getItem('categoryTypes');
    if (storedData) {
      this.categoryTypes = JSON.parse(storedData);
      this.sortListData(); 
      console.log(this.categoryTypes);
    }
  }

  AddCategory() {
    if (this.userForm.valid) {
      const newCategory = this.userForm.get('name')?.value;
      if (newCategory && !this.categoryTypes.includes(newCategory)) {
        this.categoryTypes.push(newCategory);
        sessionStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
        console.log('Categories:', this.categoryTypes);
        this.reset();
        this.head = 'Add';
      }
    }
  }

  reset(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.editIndex = -1; 
    this.head = 'Add';
  }

  getCategoriesWithCounts(): { category: string, itemCount: number }[] {
    return this.categoryTypes
      .map(category => ({
        category: category,
        itemCount: this.listData.filter(item => 
          item.category.toLowerCase() === category.toLowerCase()
        ).length
      }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }


  private sortListData(): void {
    this.listData.sort((a, b) => {
      return this.categoryTypes.indexOf(a.category) - this.categoryTypes.indexOf(b.category);
    });
  }


}

 
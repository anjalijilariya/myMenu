import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/service/items.service';
import { RestrictionService } from 'src/app/service/restriction.service';
import { SweetAlertService } from 'src/app/service/sweet-alert.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  userForm: FormGroup;
  listData: any[] = [];
  isEditMode: boolean = false; 
  head = 'Add';
  txt = 'Add';
  editIndex: number = -1; 
  categoryTypes: string[] = ['Food', 'Beverages', 'Dessert'];
  loggedIn: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private restrict: RestrictionService, private sweetAlert: SweetAlertService, private itemsService: ItemsService) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedCategories = localStorage.getItem('categoryTypes');
    if (!storedCategories) {
      // If no categories in storage, store the default ones
      localStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
    } else {
      // If categories exist in storage, load them
      this.categoryTypes = JSON.parse(storedCategories);
    }
    const storedData = localStorage.getItem('listData');
    if (storedData) {
      this.listData = JSON.parse(storedData);
      this.itemsService.sortListData(this.listData, this.categoryTypes);
    }

    this.loggedIn = localStorage.getItem('loggedIn');

    if(this.loggedIn === 'false')
      this.router.navigate(['/loggedOut']);

    this.restrict.logOut('view-category');
  }

  AddCategory() {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.listData.forEach((value) => {
          if (value.category == this.categoryTypes[this.editIndex].toLowerCase()) {
            value.category = this.userForm.value.name;
            localStorage.setItem('listData', JSON.stringify(this.listData));
          }
        });

        this.categoryTypes[this.editIndex] = this.userForm.value.name;
        this.isEditMode = false; 
        this.editIndex = -1;
      } else {
        const newCategory = this.userForm.get('name')?.value;
        if (newCategory && !this.categoryTypes.includes(newCategory)) {
          this.categoryTypes.push(newCategory);
        }
      }
      localStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
      this.head = 'Add';
      this.txt = 'Add';
      this.reset();
    }
    else 
    {
      this.sweetAlert.warningAlert("Incomplete details", "Please fill all the details!");
    }
  }

  reset(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.editIndex = -1; 
    this.head = 'Add';
    this.txt = 'Add';
  }

  public editItem(item: any): void {
    this.head = 'Edit';
    this.txt = 'Update';
    this.isEditMode = true; 
    this.editIndex = this.categoryTypes.indexOf(item.category); 
    this.userForm.patchValue({
      name: item.category,
    });
  }

  removeItem(element: any): void {

    this.sweetAlert.deleteWarningAlert('Are you sure?', 'Once deleted, you will not be able to recover this!', () => this.callback(element));
  }

  callback(element: any): void {
    this.listData.forEach((value, index) => {
      if (value.category === element.category) {
        this.itemsService.deleteData(index, 'listData', this.listData);
      }
    });

    this.categoryTypes.forEach((value, index) => {
      if (value === element.category) {
        this.itemsService.deleteData(index, 'categoryTypes', this.categoryTypes);
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

      return buf;
  }

}

 
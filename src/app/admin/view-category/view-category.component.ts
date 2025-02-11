import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestrictionService } from 'src/app/service/restriction.service';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private restrict: RestrictionService) {
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
    }

    this.loggedIn = sessionStorage.getItem('loggedIn');

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
        }
      }
      sessionStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
      this.head = 'Add';
      this.txt = 'Add';
      this.reset();
    }
    else 
    {
      swal({
        title: "Incomplete details",
        text: "Please fill all the details!",
        icon: "warning",
        buttons: {
          confirm: {
            text: "Okay",
            className: "ok"
          }
        },
        dangerMode: false,
      });
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

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
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


  private sortListData(): void {
    this.listData.sort((a, b) => {
      return this.categoryTypes.indexOf(a.category) - this.categoryTypes.indexOf(b.category);
    });
  }


}

 
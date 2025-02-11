import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/service/items.service';
import { RestrictionService } from 'src/app/service/restriction.service';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit {

  userForm: FormGroup;
  listData: any[] = [];
  categoryTypes: string[] = [];
  catlist = ['beverages', 'dessert', 'food'];
  isEditMode: boolean = false; 
  editIndex: number = -1; 
  loggedIn: any;

  constructor(private fb: FormBuilder, private router: Router, private itemsService: ItemsService, private restrict: RestrictionService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedData = this.itemsService.getData();
    
    const categoryData = sessionStorage.getItem('categoryTypes');

    if (!categoryData || JSON.parse(categoryData).length === 0) {
      // If no categories exist in storage or categoryTypes is empty, set default categories
      const defaultCategories = ['beverages', 'dessert', 'food'];
      this.categoryTypes = defaultCategories;
      sessionStorage.setItem('categoryTypes', JSON.stringify(defaultCategories));
      console.log('Initialized with default categories:', this.categoryTypes);
    } else {
      // If categories exist in storage, use those
      this.categoryTypes = JSON.parse(categoryData)
        .map((category: string) => category.toLowerCase())
        .sort();
      console.log('Using stored categories:', this.categoryTypes);
    }

    if(!storedData || storedData.length === 0)
    {
      this.router.navigate(['admin/no-items']);
    }

    if (storedData) {
      this.listData = storedData;
      this.sortListData(); 
      console.log('Sorted List Data:', this.listData);
    }

    this.loggedIn = sessionStorage.getItem('loggedIn');
    console.log(this.loggedIn);

    if(this.loggedIn === 'false')
      this.router.navigate(['/loggedOut']);

    this.restrict.logOut('view-items');
  }

  editItem(item: any, index: number): void {
    console.log(this.listData);
    sessionStorage.setItem('editItem', JSON.stringify({ item, index })); // Store item and index
    this.router.navigate(['/admin']); // Navigate to the admin page
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
          if (value === element) {
            this.itemsService.deleteData(index);            
          }
        });
        if (this.listData.length === 0) {
          this.router.navigate(['/no-items']); // Redirect when list is empty
        }
      }
    });

  }

  private sortListData(): void {
    this.listData.sort((a, b) => {
      // Get the index of each category in categoryTypes
      const indexA = this.categoryTypes.indexOf(a.category.toLowerCase());
      const indexB = this.categoryTypes.indexOf(b.category.toLowerCase());
      
      // Sort by category index
      if (indexA !== indexB) {
        return indexA - indexB;
      }
      
    });
  }
}




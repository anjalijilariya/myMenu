import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/service/items.service';
import { RestrictionService } from 'src/app/service/restriction.service';
import { SweetAlertService } from 'src/app/service/sweet-alert.service';

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

  constructor(private fb: FormBuilder, private router: Router, private itemsService: ItemsService, private restrict: RestrictionService, private sweetAlert: SweetAlertService) {
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
      this.itemsService.sortListData(this.listData, this.categoryTypes);
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

    this.sweetAlert.deleteWarningAlert('Are you sure?', 'Once deleted, you will not be able to recover this!', () => this.callback(element));

  }

  callback(element: any): void {
    this.listData.forEach((value, index) => {
      if (value === element) {
        this.itemsService.deleteData(index, 'listData', this.listData);            
      }
    });
    if (this.listData.length === 0) {
      this.router.navigate(['/no-items']); // Redirect when list is empty
    }
  }

}




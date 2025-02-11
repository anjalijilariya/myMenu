import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../service/items.service';
import { RestrictionService } from '../service/restriction.service';
import { access } from 'fs';


@Component({
  // standalone: false,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userForm: FormGroup;
  listData: any[] = [];
  // catlist = ['Beverages', 'Dessert', 'Food'];
  isEditMode: boolean = false; 
  head = 'Add';
  txt = 'Add';
  editIndex: number = -1; 
  categoryTypes: string[] = ['Beverages', 'Dessert', 'Food'];
  loggedIn: any;
  accessType: any;
  isDisabled: boolean;

  constructor(private fb: FormBuilder, private router: Router, private itemsService: ItemsService, private restrict: RestrictionService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      desc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedData = this.itemsService.getData();
    
    if (storedData) {
      this.listData = storedData;
      this.sortListData(); 
    }
    const categoryData = sessionStorage.getItem('categoryTypes');

    if (!categoryData) {
      // If no categories exist in storage, store the default ones
      sessionStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
    } else {
      // If categories exist in storage, use those
      this.categoryTypes = JSON.parse(categoryData);
    }

    // Sort categories alphabetically
    this.categoryTypes = this.categoryTypes.map(cat => cat.toLowerCase()).sort();
    console.log('Available Categories:', this.categoryTypes);

    const editData = sessionStorage.getItem('editItem');
    if (editData) 
      {
      const { item, index } = JSON.parse(editData);
      this.userForm.patchValue(item); // Pre-fill the form with item details
      this.isEditMode = true;
      this.editIndex = index;
      this.head = 'Edit';
      this.txt = 'Update';
    }

    this.loggedIn = sessionStorage.getItem('loggedIn');
    console.log(this.loggedIn);

    if(this.loggedIn === 'false')
      this.router.navigate(['/loggedOut']);

    this.restrict.logOut('admin');

    this.accessType = sessionStorage.getItem('accessType');
    this.isDisabled = '"Item-Only"' === this.accessType?true:false;
  }

  preventNegative(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }

  public addItem(): void 
  {
    if (this.userForm.valid) 
    {
      console.log(this.isEditMode);
      if (this.isEditMode) 
      {
        this.itemsService.updateData(this.userForm.value, this.editIndex);
        this.isEditMode = false;
        this.editIndex = -1;
      } 
      else 
      {
        this.itemsService.addData(this.userForm.value);
      }
      this.sortListData();
      sessionStorage.removeItem('editItem');
      this.userForm.reset();
      this.head = 'Add';
      this.txt = 'Add';
      console.log("total items: ",this.listData);
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
    console.log(this.categoryTypes);
  }

  reset(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.editIndex = -1; 
    this.head = 'Add';
    this.txt = 'Add';
  }

  private sortListData(): void {
    this.listData.sort((a, b) => {
      return this.categoryTypes.indexOf(a.category) - this.categoryTypes.indexOf(b.category);
    });
  }

  navigateToViewItems() {
    this.router.navigate(['/admin/view-items']);
  }

  navigateToViewCategory()
  {
    this.router.navigate(['/admin/view-category']);
  }

}


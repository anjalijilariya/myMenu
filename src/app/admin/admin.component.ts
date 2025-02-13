import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../service/items.service';
import { RestrictionService } from '../service/restriction.service';
import { SweetAlertService } from '../service/sweet-alert.service';

@Component({
  // standalone: false,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userForm: FormGroup;
  listData: any[] = [];
  isEditMode: boolean = false; 
  head = 'Add';
  txt = 'Add';
  editIndex: number = -1; 
  categoryTypes: string[] = ['Beverages', 'Dessert', 'Food'];
  loggedIn: any;
  accessType: string;
  isDisabled: boolean;

  constructor(private fb: FormBuilder, private router: Router, private itemsService: ItemsService, private restrict: RestrictionService, private Alert: SweetAlertService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [, [Validators.required, Validators.min(0)]],
      desc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedData = this.itemsService.getData();
    
    if (storedData) {
      this.listData = storedData;
      this.itemsService.sortListData(this.listData, this.categoryTypes);
    }
    const categoryData = localStorage.getItem('categoryTypes');

    if (!categoryData) {
      // If no categories exist in storage, store the default ones
      localStorage.setItem('categoryTypes', JSON.stringify(this.categoryTypes));
    } else {
      // If categories exist in storage, use those
      this.categoryTypes = JSON.parse(categoryData);
    }

    // Sort categories alphabetically
    this.categoryTypes = this.categoryTypes.map(cat => cat.toLowerCase()).sort();
    // console.log('Available Categories:', this.categoryTypes);

    const editData = localStorage.getItem('editItem');
    if (editData) 
      {
      const { item, index } = JSON.parse(editData);
      this.userForm.patchValue(item); // Pre-fill the form with item details
      this.isEditMode = true;
      this.editIndex = index;
      this.head = 'Edit';
      this.txt = 'Update';
      localStorage.removeItem('editItem');
    }

    this.loggedIn = localStorage.getItem('loggedIn');

    if(this.loggedIn === 'false')
      this.router.navigate(['/loggedOut']);

    this.restrict.restrict('admin');

    this.accessType = localStorage.getItem('accessType');
    this.isDisabled = 'Item-Only' === this.accessType?true:false;
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
      if (this.isEditMode) 
      {
        this.itemsService.updateData(this.userForm.value, this.editIndex);
        this.isEditMode = false;
        this.editIndex = -1;
      } 
      else 
      {
        if(this.isValid(this.userForm.value.name, this.userForm.value.category))
          this.itemsService.addData(this.userForm.value);
        else
          this.Alert.warningAlert("Duplicate Item", "This item already exists in the list!");
      }

      this.itemsService.sortListData(this.listData, this.categoryTypes);
      localStorage.removeItem('editItem');
      this.userForm.reset();
      this.head = 'Add';
      this.txt = 'Add';
      console.log("total items: ",this.listData);
    } 
    else 
    {
      this.Alert.warningAlert("Incomplete details", "Please fill all the details!");
    }
  }

  reset(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.editIndex = -1; 
    this.head = 'Add';
    this.txt = 'Add';
  }

  navigateToViewItems() {
    this.router.navigate(['/admin/view-items']);
  }

  navigateToViewCategory()
  {
    this.router.navigate(['/admin/view-category']);
  }

  isValid(name: string, category: string): boolean{
    let valid = true;
    this.listData.forEach(item => {
      if(item.name.toLowerCase() == name.toLowerCase() && item.category == category)
        valid = false;
    });
    return valid;
  }
}


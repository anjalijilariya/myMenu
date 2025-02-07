import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  notAllowed = '"Category-Only"';
  cust = '""';
  isDisabled: boolean;

  constructor(private fb: FormBuilder, private router: Router) {
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
      //console.log(item,index);
    }

    this.loggedIn = sessionStorage.getItem('loggedIn');
    console.log(this.loggedIn);

    if(this.loggedIn === 'false')
      this.router.navigate(['/loggedOut']);

    this.accessType = sessionStorage.getItem('accessType');
     console.log(this.accessType, this.notAllowed, this.cust);

    this.isDisabled = this.accessType=='"Item-Only"'?true:false;
    
    if(this.accessType == this.notAllowed || this.accessType == this.cust)
      this.router.navigate(['/restricted']);
  }

  public addItem(): void 
  {
    console.log("hello");
    if (this.userForm.valid) 
    {
      console.log(this.isEditMode);
      if (this.isEditMode) 
      {
        console.log(this.editIndex);
        console.log(this.listData[this.editIndex]);
        this.listData[this.editIndex] = this.userForm.value;
        this.isEditMode = false;
        console.log(this.listData[this.editIndex]);
        this.editIndex = -1;
      } 
      else 
      {
        this.listData.push(this.userForm.value);
      }
      this.sortListData();
      sessionStorage.setItem('listData', JSON.stringify(this.listData));
      sessionStorage.removeItem('editItem');
      this.userForm.reset();
      this.head = 'Add';
      this.txt = 'Add';
      console.log("total items: ",this.listData);
      // this.router.navigate(['/admin/view-items']);
    } 
    else 
    {
      // alert('All fields are necessary to be filled!');
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


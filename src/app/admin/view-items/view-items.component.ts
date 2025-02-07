import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  accessType: any;
  notAllowed = '"Category-Only"';
  cust = '""';

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

    if(!storedData || JSON.parse(storedData).length === 0)
    {
      this.router.navigate(['admin/no-items']);
    }

    if (storedData) {
      this.listData = JSON.parse(storedData);
      this.sortListData(); 
      console.log('Sorted List Data:', this.listData);
    }

    this.loggedIn = sessionStorage.getItem('loggedIn');
    console.log(this.loggedIn);

    if(this.loggedIn === 'false')
      this.router.navigate(['/loggedOut']);

    this.accessType = sessionStorage.getItem('accessType');
    // console.log(this.accessType, this.notAllowed);

    if(this.accessType == this.notAllowed || this.accessType == this.cust)
      this.router.navigate(['/restricted']);
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
            this.listData.splice(index, 1);
    
            sessionStorage.setItem('listData', JSON.stringify(this.listData));
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
      
      // If categories are the same, sort by name
      // return a.name.localeCompare(b.name);
    });
  }
}




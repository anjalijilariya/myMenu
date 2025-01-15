import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userForm: FormGroup;
  listData: any[] = [];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Load stored data from sessionStorage if available
    const storedData = sessionStorage.getItem('listData');
    if (storedData) {
      this.listData = JSON.parse(storedData);
    }
  }

  public addItem(): void {
    // Push new item to the list
    this.listData.push(this.userForm.value);

    // Store the updated list in sessionStorage
    sessionStorage.setItem('listData', JSON.stringify(this.listData));

    // Reset the form
    this.userForm.reset();
  }

  reset(): void {
    this.userForm.reset();
  }

  removeItem(element: any): void {
    this.listData.forEach((value, index) => {
      if (value === element) {
        this.listData.splice(index, 1);
        // Update the stored data in sessionStorage after removing the item
        sessionStorage.setItem('listData', JSON.stringify(this.listData));
      }
    });
  }

}

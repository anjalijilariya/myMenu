import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{

  userForm: FormGroup;
  cat: any;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      idxf: ['', Validators.required],
      idxb: ['', Validators.required],
      idxd: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  Change(event: Event): void
  {
    var vari = event.target as HTMLElement;
    this.cat = vari.innerHTML.toLowerCase();

    // // Store the updated list in sessionStorage
    sessionStorage.setItem('cat', JSON.stringify(this.cat));
    

    //console.log(vari.innerHTML.toLowerCase());
  }
}
import { Component, OnInit, ChangeDetectionStrategy,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  // standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;
  accessType: any;

  users: any = [
    {
        'userType': 'Admin-1',
        'userName': 'Adm_1',
        'password': 'Password_Adm@1',
        'access' : 'Item-Only'
    },
    {
        'userType': 'Admin-2',
        'userName': 'Adm_2',
        'password': 'Password_Adm@2',
        'access' : 'Category-only'
    },
    {
        'userType': 'Admin-3',
        'userName': 'Adm_3',
        'password': 'Password_Adm@3',
        'access' : 'Both'
    },
    {
        'userType': 'Customer',
        'userName': 'Cust_1',
        'password': 'Password_Cust@1',
        'access' : ''
    },
    {
        'userType': 'Customer',
        'userName': 'Cust_2',
        'password': 'Password_Cust@2',
        'access' : ''
    },
];

  ngOnInit(): void {
    this.accessType ='';
    this.loggedIn = false;
    sessionStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));
  }
  
  loginForm: FormGroup;
  txt: string;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required], // Form control for 'Name' with validation
      passwd: ['', Validators.required], // Form control for 'Password' with validation
    });
  }

  loginCheck()
  {
    console.log(this.loginForm.value, this.users);
    for (let index = 0; index < this.users.length; index++) {
      if(this.loginForm.value.name===this.users[index].userName && this.loginForm.value.passwd === this.users[index].password)
      {
        swal({
          title: this.users[index].userType.toUpperCase() + " Login Successful",
          text: "Welcome "+ this.users[index].userName,
          icon: "success",
          buttons: {
            confirm: {
              text: "Okay",
              className: "ok"
            }
          },
          dangerMode: false,
        });

        this.loggedIn = true;
        sessionStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));
        this.accessType = this.users[index].access;
        sessionStorage.setItem('accessType', JSON.stringify(this.accessType));
        if(this.accessType === '')
          this.router.navigate(['customer']);
        else if(this.accessType === 'Item-Only')
          this.router.navigate(['admin']);
        else if(this.accessType === 'Category-only')
          this.router.navigate(['admin/view-category']);
        else if(this.accessType === 'Both')
          this.router.navigate(['admin']);
      }
    }

    if(!this.loggedIn)
    swal({
      title: "Login Failed",
      text: "Invalid Credentials",
      icon: "error",
      buttons: {
        confirm: {
          text: "Okay",
          className: "ok"
        }
      },
      dangerMode: false,
    });
  }

  hide = true;

}

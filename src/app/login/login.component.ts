import { Component, OnInit, ChangeDetectionStrategy,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  username = ['admin1', 'admin2' , 'client1', 'client2'];
  usertype = ['admin', 'admin', 'customer', 'customer'];
  password = ['123', '456', '789', 'abc'];
  check: boolean = true;

  ngOnInit(): void {
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
    console.log(this.loginForm.value);
    for (let index = 0; index < this.username.length; index++) {
      if(this.loginForm.value.name===this.username[index] && this.loginForm.value.passwd === this.password[index])
      {
        alert( this.usertype[index] + " login successful");
        this.router.navigate([this.usertype[index]]);
        this.check = false;
      }
    }

    if(this.check)
      alert("Invalid Credentials");
  }

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = (!this.hide);
    event.stopPropagation();
  }

}

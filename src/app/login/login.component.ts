import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  name: string;
  passwd: string;

  loginCheck()
  {
    if(this.name==="admin" && this.passwd === "123")
    {
      alert("Admin login successful");
      this.router.navigate(['admin']);
    }

    else if(this.name==="customer" && this.passwd === "456")
    {
      alert("Customer login successful");
      this.router.navigate(['customer']);
    }

    else
    {
      alert("Invalid Credentials");
    }
  }
}

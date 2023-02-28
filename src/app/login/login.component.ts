import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs';
import { BlogserviceService } from '../service/blogservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private blogservice: BlogserviceService) { }


  ngOnInit(): void {
  }
  emailregix = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  LoginForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailregix)])

  })
  login() {
    this.http.get<any>("https://super-dove-lingerie.cyclic.app/register")
      .subscribe(res => {
        // this.user=res;
        const user = res.find((a: any) => {
          return a.email === this.LoginForm.value.email && a.password === this.LoginForm.value.password;

        });
        const username = res.find((b: any) => {
          return b.your_name;
        })


        if (user && username) {
          this.toastr.success("login successfully");
          localStorage.setItem('user', this.LoginForm.value.email);
          localStorage.setItem('username',username.your_name)
          //this.blogservice.emitEmail(user);
          this.router.navigate(['blogs']);


        }
        else {
          this.toastr.warning("Invalid credientials");
        }
      })
  }



  get email() {
    return this.LoginForm.get('email');
  }
  get password() {
    return this.LoginForm.get('password');
  }


}

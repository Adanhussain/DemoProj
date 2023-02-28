import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { BlogserviceService } from '../service/blogservice.service';
@Component({
  selector: 'app-registrter',
  templateUrl: './registrter.component.html',
  styleUrls: ['./registrter.component.css']
})
export class RegistrterComponent implements OnInit {
registerUsers:any=[];
isEdit:boolean=false;
  constructor(private http:HttpClient,private blogservice:BlogserviceService,private router:Router , private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  
  
emailregix='^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
SingupForm=new FormGroup({
  your_name:new FormControl('',Validators.required),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  email:new FormControl('',[Validators.required,Validators.pattern(this.emailregix)])
})

myfun(){
this.isEdit=true;
this.blogservice.emitEdit(this.isEdit)
}
OnSubmit(){
  debugger;
  // const formdata = new FormData();
  // formdata.append('enter_name', this.SingupForm.value.your_name);
  // formdata.append('enter_email',this.SingupForm.value.email);
  // formdata.append('enter password',this.SingupForm.value.password);
  // this.blogservice.postSingup(this.SingupForm.value).subscribe(res=>{
  //   this.toastr.success("SingUp successfully");
  // })
  this.http.get("https://super-dove-lingerie.cyclic.app/register").subscribe((resp)=>{
this.registerUsers=resp;
    const user=this.registerUsers.find((a:any)=>{
      return a.email===this.SingupForm.value.email
    });
    if(user){
      this.toastr.warning("Email already exist in Database");
    }
    else{
  console.log("this.SingupForm.value",this.SingupForm.value)
      this.blogservice.postSingup(this.SingupForm.value).subscribe(res=>{
        this.toastr.success("SingUp successfully");
      })


      this.toastr.success("SingUp successfully");
      this.SingupForm.reset();
      
      this.router.navigate(['login'])
    }
    
  });
  
  
  

}



get your_name()
{
    return this.SingupForm.get('your_name');
}
get password(){
  return this.SingupForm.get('password');
}
get email(){
  return this.SingupForm.get('email');
}

}


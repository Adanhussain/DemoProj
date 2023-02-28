import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogserviceService } from '../service/blogservice.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message: any={};
  

  constructor(private blogService:BlogserviceService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  contactForm=new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.minLength(6)]),
    message:new FormControl('',[Validators.required])
  })
  onSubmit(){
    console.log("this.contactForm.value",this.contactForm.value)
   this.blogService.postMessage(this.contactForm.value).subscribe(mess=>{
     this.message=mess;
   })
  }

}

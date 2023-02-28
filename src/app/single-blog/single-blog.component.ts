import { Component, OnInit } from '@angular/core';
import { BlogserviceService } from '../service/blogservice.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  userId!: number;
  blog:any={}
  blogForm!:FormGroup
  constructor(private blogService:BlogserviceService,private router:ActivatedRoute,private fb:FormBuilder) {
    this.userId=(this.router.snapshot.params['id']);
    console.log("this is userid",this.userId)
   }

  ngOnInit(): void {
//    this.blogService.getBlogsbyId(this.router.snapshot.params['id']).subscribe((resp)=>{
//  console.log(resp)
//})
// this.blogForm = this.fb.group({
//   name: ['', Validators.required],
//   image: ['',Validators.required],
//   email:['',Validators.required],
//   blog_title:['',Validators.required],
//   Blog_Content:['',Validators.required]

// })
this.blogService.getBlogsbyId(this.userId).subscribe(blog=>{
  // console.log('this is blog',blog)
  this.blog=blog;
  console.log("this is blog value",this.blog)
 
})
}
}

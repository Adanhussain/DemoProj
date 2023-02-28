import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { BlogserviceService } from '../service/blogservice.service';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  categoryOfBlogs = [
    { id: 1, name: "Development" },
    { id: 2, name: "Designing" },
    { id: 3, name: "Graphics" },
    { id: 4, name: "IOS" },
    { id: 5, name: "Others" }
  ];
  user: any = {};
  status = ''
  editForm: boolean = true;
  blog: any = {}
  edit: any = {};
  userId: number;
  imageName: any;
  blogForm!: FormGroup
  constructor(private fb: FormBuilder, private blogService: BlogserviceService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userId = this.activatedRoute.snapshot.params['id'];
    console.log(this.userId)
    if (this.userId) {
      this.status = 'update'
    } else {
      this.status = 'post'
    }
  }
  ngOnInit(): void {
    this.blogService.recieveUser().subscribe(user => {
      this.user = user;
      console.log("this is user email,", this.user)
    })
    this.blogForm = this.fb.group({
      image: ['', Validators.required],
      blog_title: ['', Validators.required],
      Blog_Content: ['', Validators.required],
      category: ['', Validators.required]
    })
    this.blogService.getUserBlog(this.userId).subscribe(blog => {
      this.blog = blog;
      this.blogForm.patchValue({
        id: this.blog.id,
        blog_title: this.blog.blog_title,
        Blog_Content: this.blog.Blog_Content,
        category: this.blog.category
      })
    })
  }
  OnFileChanged(event: any) {
    //console.log("event", event.target.files[0].name)
    const file = event.target.files[0];
    this.imageName = event.target.files[0].name
  }
  onSubmit(status: string) {
    this.status = status;
    const email = localStorage.getItem('user')
    const authorName = localStorage.getItem('username')
    const DateNow = new Date();
    if (status == 'post') {
      const formdata = new FormData();
      //formdata.append('enter_name', this.blogForm.value.name);
      //formdata.append('enter_email',this.blogForm.value.email);
      formdata.append('enter blog_title', this.blogForm.value.blog_title);
      formdata.append('enter Blog_content', this.blogForm.value.Blog_Content);
      formdata.append('enter Blog_content', this.blogForm.value.category);
      this.blogForm.value.email = email;
      this.blogForm.value.name = authorName;
      this.blogForm.value.image = this.imageName;
      console.log("this is time", DateNow)
      this.blogForm.value.date = DateNow.getDate();
      console.log("this.blogForm.value",this.blogForm.value)
      this.blogService.postBlogs(this.blogForm.value).subscribe((result => {
      }))
      // this.name?.reset();
      // this.image?.reset();
      // this.blog_title?.reset();
      // this.Blog_Content?.reset();
      this.router.navigate(['blogs']);
      console.log("the form values are ", this.blogForm.value)
    }
    else if (status == 'update') {
      this.blogForm.value.image = this.imageName;
      this.blogForm.value.email = email;
      this.blogForm.value.name = authorName;
      this.blogService.updateblog(this.userId, this.blogForm.value).subscribe(res => {
        console.log("this is update value", res)
        this.name?.reset();
        this.blog_title?.reset();
        this.Blog_Content?.reset();
      })
      this.router.navigate(['blogs']);
    }
  }
  get name() {
    return this.blogForm.get('name');
  }
  get image() {
    return this.blogForm.get('image');
  }
  get email() {
    return this.blogForm.get('email');
  }
  get blog_title() {
    return this.blogForm.get('blog_title');
  }
  get Blog_Content() {
    return this.blogForm.get('Blog_Content');
  }



}

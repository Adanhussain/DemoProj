import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogserviceService } from '../service/blogservice.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogEmpty: boolean = false;
  blogs: any = [];
  usersBlogs: any = [];
  headerReload: boolean = false;
  user: any = {};
  formValue: any;
  constructor(private blogService: BlogserviceService, private router: ActivatedRoute, private toastr: ToastrService) { }
  ngOnInit(): void {

    const email = localStorage.getItem('user')
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
      this.usersBlogs = [];
      console.log("blog email",email)
      console.log("blog",this.blogs)
      this.blogs.forEach((blog: any) => {
        console.log("blog emafffil",blog.email)
        
        if (blog.email == email) {
          this.usersBlogs.push(blog);
          console.log("if",this.usersBlogs)
        }
        if (this.usersBlogs.length == 0) {
          this.blogEmpty = true;
          console.log("blog are ",this.usersBlogs.length)
        }
        else {
          this.blogEmpty = false;
        }
      });
    })



  }
  delete(id: any) {
    this.blogService.deleteBlog(id).subscribe(resp => {
      console.log(resp)
      this.headerReload = true;
      this.toastr.error("Delete this blog");
      setTimeout(() => {
        this.ngOnInit();
      }, 1000);


    })
  }



}
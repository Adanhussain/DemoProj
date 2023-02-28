import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlogserviceService } from '../service/blogservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  user: any = {};
  usersBlogs: any = [];
  blogs: any = [];
  filterCategory:any=[];
  @Input() blogsUpdate?: boolean;

  isLoggedIn: boolean = false;
  constructor(private blogService: BlogserviceService, private router: Router) { }
  ngOnInit(): void {
    //console.log('nongddd heardee')
    this.blogService.recieveUser().subscribe(user => {
      this.user = user;
    });
    const email = localStorage.getItem('user')
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
      this.filterCategory=blogs;
      console.log("filtercategory data is ",this.filterCategory)
      this.usersBlogs = [];
      this.blogs.forEach((blog: any) => {
        if (blog.email == email) {
          this.usersBlogs.push(blog);

        }
      });
    })
    if (localStorage.getItem('user')) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false
    }
  }

  ngOnChanges() {
    if(this.blogsUpdate) {
      this.ngOnInit();
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  filter(enterCategory:string){
    // debugger
    this.filterCategory=this.blogs
    .filter((a:any)=>{
     if( a.category === enterCategory ){
      return a.category.value;
      
     }
        
     console.log("a value is ",a.value);
      console.log("the value of a",a.category)
      console.log("the value of button clicked",a.enterCategory)
    })
    
        }




}

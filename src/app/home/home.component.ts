import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogserviceService } from '../service/blogservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  searchFilter: any;
  p: any;
  blogs: any = [];
 
  //counter:number;

  constructor(private blogService: BlogserviceService, private route: ActivatedRoute) {
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // console.log('params', params.get('name'))
      this.searchFilter = params.get('name')
    })
    this.getData();

  }
  getData() {
    this.blogService.getBlogs().subscribe(blog => {
      this.blogs = blog
      
      console.log("these are blog",this.blogs)


    });
    
  }
 
}





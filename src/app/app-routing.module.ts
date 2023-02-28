import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { BlogsComponent } from './blogs/blogs.component';
import { ContactComponent } from './contact/contact.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrterComponent } from './registrter/registrter.component';

import { SingleBlogComponent } from './single-blog/single-blog.component';

const routes: Routes = [

  {
    path:'',component:HomeComponent
  },
  {
    path:'create-blog',canActivate:[AuthGuard],component:CreateBlogComponent
  },
  {
    path:'create-blog/:id',canActivate:[AuthGuard],component:CreateBlogComponent
  },
  
  {
    path:'single-blog/:id',component:SingleBlogComponent
  },
  {
    path:'registration-form',component:RegistrterComponent
  },
  {
    path:'login',component:LoginComponent
  },

  
  {
    path:'blogs',canActivate:[AuthGuard], component:BlogsComponent
  },
  {
    path: 'home/:name', component: HomeComponent
 },
  {
    path :'about',component:AboutComponent
  },
  {
    path:'contact-us',component:ContactComponent
  },
  {
    path:'**',component: ErrorPageComponent   
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

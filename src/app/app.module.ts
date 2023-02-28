import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BlogserviceService } from './service/blogservice.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrterComponent } from './registrter/registrter.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BlogsComponent } from './blogs/blogs.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReversePipe } from './shared/reverse.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CreateBlogComponent,
    RegistrterComponent,
    SingleBlogComponent,
    LoginComponent,
    BlogsComponent,
    ErrorPageComponent,
    AboutComponent,
    ContactComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot()
  ],
  providers: [BlogserviceService,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }

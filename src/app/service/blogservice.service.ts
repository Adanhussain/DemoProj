import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class BlogserviceService {
  rootUrl='https://super-dove-lingerie.cyclic.app/';  

 
  constructor(private http:HttpClient) { }

  postBlogs(blogForm:any){
    return this.http.post(this.rootUrl +'posts/',blogForm)
  }
  getBlogs(){
    return this.http.get(this.rootUrl +'posts/')
  }
  getBlogsbyId(id:any)
  {
     return this.http.get(this.rootUrl+'posts/'+id)
  }
  deleteBlog(id:number){
return this.http.delete(this.rootUrl + 'posts/' + id)
  }
  postSingup(SingupForm:any){
    return this.http.post<any>(this.rootUrl+'register',SingupForm)
      }
      postMessage(contactForm:any){
        return this.http.post<any>(this.rootUrl+'contact/',contactForm)
      }
  public subject=new BehaviorSubject<any>("");
  public editSub=new BehaviorSubject<any>("");
  emitEmail(data:any){
  this.subject.next(data)
  }
  recieveUser():Observable<any>{
     return this.subject.asObservable();
  }
  emitEdit(data:any){
    debugger;
   this.editSub.next(data)
  }
  
  recievEdit(){
    
    return this.editSub.asObservable();
  }

  getUserBlog(email:any){
    return this.http.get(this.rootUrl+'posts/'+email)
  }


  updateblog(id:number,data:any){
    return this.http.put(this.rootUrl+'posts/'+id,data)
  }


 
}


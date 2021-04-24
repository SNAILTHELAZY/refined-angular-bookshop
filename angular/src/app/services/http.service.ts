import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from '../interfaces/user';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  //user authentication requests
  public login(user:User){
    return this.http.post('/users/login',user,{
      withCredentials:true
    });
  }

  public register(user:User){
    return this.http.post('/users/register',user,{
      responseType:'json',
      withCredentials:true
    });
  }

  public logout(){
    return this.http.post('/users/logout',{},{withCredentials:true});
  }

  public checkLogin(){
    return this.http.get('/users',{withCredentials:true});
  }

  //book related
  public createBook(formData:FormData){
    return this.http.post('/books/new',formData,{responseType:'json'});
  }

  public getBooks(keyword?:string){
    if(keyword){
      return this.http.get('/books?keyword='+keyword,{responseType:'json'});
    }else{
      return this.http.get('/books',{responseType:'json'});
    }
    
  }

  public updateBooks(id:string,formData){
    return this.http.put('/books/'+id,formData,{responseType:'json'});
  }

  public deleteBooks(id:string){
    return this.http.delete('/books/'+id,{responseType:'json'});
  }

  public getBookCover(cover:string){
    return this.http.get('/books/image/'+cover,{responseType:'blob'});
  }
}

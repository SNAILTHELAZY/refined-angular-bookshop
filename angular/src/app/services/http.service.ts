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

  public getBooks(){
    return this.http.get('/books',{responseType:'json'});
  }

  public updateBooks(){}

  public deleteBooks(){}
}

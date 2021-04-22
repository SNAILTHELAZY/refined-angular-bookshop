import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http) { }

  //user authentication requests
  public login(){}

  public register(){}

  public logout(){}

  //book related
  public createBook(){}

  public getBooks(){}

  public updateBooks(){}

  public deleteBooks(){}
}

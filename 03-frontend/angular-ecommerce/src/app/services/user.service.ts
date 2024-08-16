import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/test/';

const USER_API = 'http://localhost:8081/api/users/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any>{
    return this.http.get(API_URL + 'all',{responseType: 'text'});
  }

  getUserBoard(): Observable<any>{
    return this.http.get(API_URL + 'user',{responseType: 'text'});
  }

  getModeratorBoard(): Observable<any>{
    return this.http.get(API_URL + 'mod',{responseType: 'text'});
  }

  getEmployeeBoard() {
    return this.http.get(API_URL + 'employee',{responseType: 'text'});
  }

  getAdminBoard(): Observable<any>{
    return this.http.get(API_URL + 'admin',{responseType: 'text'});
  }

  updateUserDetail(id: string, username: string, email: string, cellphone: string):Observable<any>{
    return this.http.put(
      USER_API + id,
      {
        username,
        email,
        cellphone
      },
      httpOptions
    );
  }
}

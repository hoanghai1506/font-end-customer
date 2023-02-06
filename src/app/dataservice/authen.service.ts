import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor( private http: HttpClient) { }
  login(email: string, password: string) {
    return this.http.post('http://127.0.0.1:8000/api/loginCustomer', {
      email: email,
      password: password,
    });
  }
 
  // logout
  
  logout() {
    localStorage.removeItem('user');
  }
  // register
  register(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/registerCustomer', data);
  }
}

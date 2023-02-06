import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  addOrderDetail(formData: any) {
    return this.http.post('http://127.0.0.1:8000/api/addOrderDetail', formData);
  }
  

  constructor(private http: HttpClient) { }
  getProduct():Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getProducts');
  }
  getnewProduct():Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/get3ProductNew');
  }
  get6Product(id :any):Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/get4ProductNew/'+id);
  }
  getProductCategorybyId(id :any):Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getProductByCategory/'+id);
  }
  // get product by id
  getProductById(id :any):Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getProductbyId/' + id);
  }
  // add product to cart
  addOrderDetails(product: any) {
    return this.http.post('http://127.0.0.1:8000/api/addOrderDetail', product);
  }
  // add order
  addOrder(product: any) {
    return this.http.post('http://127.0.0.1:8000/api/addInvoice', product);
  }
  // add order for guest
  addOrderForGuest(product: any) {
    return this.http.post('http://127.0.0.1:8000/api/addInvoice', product);
  }

  //get newsest order
  getNewestOrder():Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getNewestOrder');
  }
  addAddressForGuest(Address: any) {
    return this.http.post('http://127.0.0.1:8000/api/addOrderforCustomerNotLogin', Address);
  }
  // add address for customer
  addAddress(Address: any) {
    return this.http.post('http://127.0.0.1:8000/api/addAddressforCustomerLogin', Address);
  }
  // getOrderByCustomerId
  getOrderByCustomerId(id :any):Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/getOrderByCustomerId/'+id);
  }
 
}

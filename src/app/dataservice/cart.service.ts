import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartDataList: any = [];
  productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient ) { 
    this.cartDataList = JSON.parse(localStorage.getItem('cart') || '[]');
   }
  getproductList() {
    return this.productList.asObservable();
  }
  // set product list
  setProductList(product: any) {
    this.cartDataList.push(...product);
    this.productList.next(product);
  }
  // add product to cart
  addProductToCart(product: any) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = cart.findIndex((item: { id: any; }) => item.id === product.id);
    if (idx > -1) {
      cart[idx].num += 1;
    } else {
      cart.push({ ...product, num: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.productList.next(cart);
  }
  // get total amount
  getTotalAmount() {
    let grandtotal = 0;
    this.cartDataList.map((a: any) => {
      grandtotal += a.total;
    })
  }
  // remove cart data
  removeCartData(product: any) {
    this.cartDataList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartDataList.splice(index, 1);
      }
    })
  }
  // remove all cart data
  removeAllCartData() {
    this.cartDataList = [];
    this.productList.next(this.cartDataList);
  }
  loadCart(): void {
    this.cartDataList = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.cartDataList)); 
  }
  getCart() {
    return this.cartDataList;
  }
  clearCart(items: any) {
    this.cartDataList = [];

    localStorage.removeItem("cart_items")
  }
  // add to cart
  addToCart(product: any) {
    this.cartDataList.push(product);
    this.saveCart();
  }
  removeProduct(product: any) {
    const index = this.cartDataList.indexOf(product);
    this.cartDataList.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartDataList));
  }
}

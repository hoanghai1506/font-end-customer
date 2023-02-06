import { Component, EventEmitter, Input } from '@angular/core';
import { AfterViewChecked, ElementRef } from '@angular/core';
import { CartService } from './dataservice/cart.service';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Hana Shop - cosmetics';
  user: any;
  cartLength:any;
  cartDataList: any = [];
  productInCart: any = [];
  isEmpty: boolean = false;
  @Input() set addedProduct(product: any) {
    this.productInCart.push(product);
    console.log('test'+this.productInCart);
  }
  constructor(private elementRef: ElementRef,
    private cart: CartService,
    public dialog: MatDialog) {
      this.productInCart = [];
  }
  ngOnInit(): void {
    const localData: any = localStorage.getItem('user');
    const localDataObj = JSON.parse(localData)
    this.user = localDataObj.name;
    this.cartDataList = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartLength = this.cartDataList.length;
    if (this.cartLength=== 0) {
      this.isEmpty = true;
    } else {
      this.cartDataList.map((a: any) => {
        this.productInCart.push(a);
      })
    }
    this.addedProduct.subscribe((product: any) => {
      this.productInCart.push(product);
    });
   
  }
  
  ngAfterViewChecked() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/app.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  isLogin() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('user');
  }
  addToCart(product: any) {
    this.cart.addProductToCart(product);
  }
  addProductToCart(product: any) {
    this.cartDataList =product;
  }
 

}

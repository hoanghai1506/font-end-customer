import { Router } from '@angular/router';
import { DataserviceService } from './../dataservice/dataservice.service';
import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { CartService } from '../dataservice/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MatDialog]
})
export class HomeComponent {
  newproduct : any;
  product : any;
  product6 : any;
  modalRef?: BsModalRef;
  productInCart = [];
  functional_food : any;
  viewProduct:any;
  constructor(private DataserviceService:DataserviceService ,
    private modalService: BsModalService,
    private cart: CartService , 
    private router : Router,
    ) {
    this.productInCart = [];
   }
  ngOnInit():void {
    this.productInCart = [];
    this.getnewProducts();
    this.getProduct();
    this.get6Product();

  }
  getnewProducts(){
    this.DataserviceService.getnewProduct().subscribe(res => {
      this.newproduct = res;
    })
  }
  getProduct(){
    this.DataserviceService.getProduct().subscribe(res => {
      this.product = res;
    })
  }
  get6Product(){
    this.DataserviceService.get6Product(2).subscribe(res => {
      this.functional_food = res;
    })
    this.DataserviceService.get6Product(3).subscribe(res => {
      this.product6 = res;
    })
  }
  addToCart(product: any) {
    this.cart.addProductToCart(product);
    const productInCart = JSON.parse(localStorage.getItem('cart') || '[]');
  }
  openModal(template: TemplateRef<any> , id : any) {
    this.modalRef = this.modalService.show(template);
    this.DataserviceService.getProductById(id).subscribe(res => {
      this.viewProduct = res;
      console.log(this.viewProduct);
    })
  }
  
}


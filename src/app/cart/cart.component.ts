import { Component, EventEmitter, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith, Subject } from 'rxjs';
import { CartService } from '../dataservice/cart.service';
import { AddessForGuest } from '../class/addess-for-guest';
import { DataserviceService } from '../dataservice/dataservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartDataList: any = [];
  productInCart: any = [];
  isEmpty: boolean = false;
  total_bill = 0;
  oder_id: any;
  id_user = null;
  cartUpdated = new Subject();
  form: FormGroup;
  is_login: boolean = false;
  AddessForGuest = new AddessForGuest();
  constructor(private router: Router,
    private cart: CartService,
    public fb: FormBuilder,
    private DataserviceService: DataserviceService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      phone: [''],
      email: [''],
      province: [''],
      district: [''],
      ward: [''],
      Address_detail: [''],
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.is_login = true;
    }
    this.getcartDataList();
    this.cartDataList = JSON.parse(localStorage.getItem('cart') || '[]');
    if (this.cartDataList.length === 0) {
      this.isEmpty = true;
    } else {
      this.cartDataList.map((a: any) => {
        this.productInCart.push(a);
        this.total_bill = this.productInCart.reduce((a: any, b: any) => a + (b.num * b.export_price), 0);
      })
    }
    console.log(this.total_bill);
  }
  addQuantity(id: any) {
    this.cartDataList.map((a: any) => {
      if (a.id === id && a.num < a.quantity) {
        a.num += 1;
      } else if (a.id !== id || a.num >= a.quantity) {
        this.toastr.error('Sorry, the current product quantity is not enough.');
      }
    });
    this.total_bill = this.cartDataList.reduce((a: any, b: any) => a + (b.num * b.export_price), 0);
    localStorage.setItem('cart', JSON.stringify(this.cartDataList));
  }
  reduceQuantity(id: any) {

    this.cartDataList.map((a: any) => {
      if (a.id == id) {
        if (a.num > 1) {
          a.num = a.num - 1;
          localStorage.setItem('cart', JSON.stringify(this.cartDataList));
        }
        else {
          this.deleteItem(id);
          localStorage.setItem('cart', JSON.stringify(this.cartDataList));
        }
      }
    });
    this.total_bill = this.cartDataList.reduce((a: any, b: any) => a + (b.num * b.export_price), 0);
  }
  removeItem(product: any) {
    this.cartDataList.map((a: any, index: any) => {
      if (a.id == product.id) {
        this.cartDataList.splice(index, 1);
        this.cd.detectChanges();
      }
    })
    localStorage.setItem('cart', JSON.stringify(this.cartDataList));
  }
  deleteItem(id: any) {
    this.cartDataList.map((a: any, index: any) => {
      if (a.id == id) {
        this.cartDataList.splice(index, 1);
      }
    })
  }
  // load data from local storage
  getcartDataList() {
    const data = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartDataList = data;
  }
  // add product to cart database
  addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      this.toastr.error('Giỏ hàng trống', 'Thông báo');
    } else {
      let user = JSON.parse(localStorage.getItem('user') || '[]');
      if (localStorage.getItem('user') == null) {
        var formdataForGuestLogin: any = new FormData();
        formdataForGuestLogin.append('id_user', '');
        formdataForGuestLogin.append('total_bill', this.total_bill);
        formdataForGuestLogin.append('status', '0');
        this.DataserviceService.addOrderForGuest(formdataForGuestLogin).subscribe((res: any) => {
          console.log(res);
        });
        this.DataserviceService.getNewestOrder().subscribe((res: any) => {
          this.oder_id = res.id;
          var formdataForGuestAdress: any = new FormData();
          formdataForGuestAdress.append('id_order', this.oder_id);
          formdataForGuestAdress.append('phone', this.form.get('phone')?.value);
          formdataForGuestAdress.append('email', this.form.get('email')?.value);
          formdataForGuestAdress.append('province', this.form.get('province')?.value);
          formdataForGuestAdress.append('district', this.form.get('district')?.value);
          formdataForGuestAdress.append('ward', this.form.get('ward')?.value);
          formdataForGuestAdress.append('Address_detail', this.form.get('Address_detail')?.value);
          this.DataserviceService.addAddressForGuest(formdataForGuestAdress).subscribe((res: any) => {
            console.log(res);
          });
        });

      } else {
        var formdataForCustomerLogin: any = new FormData();
        formdataForCustomerLogin.append('id_user', user.id);
        formdataForCustomerLogin.append('total_bill', this.total_bill);
        formdataForCustomerLogin.append('status', '0');
        this.DataserviceService.addOrderForGuest(formdataForCustomerLogin).subscribe((res: any) => {

        });
        this.DataserviceService.getNewestOrder().subscribe((res: any) => {
          this.oder_id = res.id;
          var formdataForGuestAdress: any = new FormData();
          formdataForGuestAdress.append('id_order', this.oder_id);
          formdataForGuestAdress.append('phone', this.form.get('phone')?.value);
          formdataForGuestAdress.append('email', this.form.get('email')?.value);
          formdataForGuestAdress.append('province', this.form.get('province')?.value);
          formdataForGuestAdress.append('district', this.form.get('district')?.value);
          formdataForGuestAdress.append('ward', this.form.get('ward')?.value);
          formdataForGuestAdress.append('Address_detail', this.form.get('Address_detail')?.value);
          this.DataserviceService.addAddressForGuest(formdataForGuestAdress).subscribe((res: any) => {
            console.log(res);
          });
        });
      }
      this.DataserviceService.getNewestOrder().subscribe((res: any) => {
        this.oder_id = res.id;
        for (let i = 0; i < this.cartDataList.length; i++) {

          var formData: any = new FormData();
          formData.append('id_order', this.oder_id);
          formData.append('id_product', this.cartDataList[i].id);
          formData.append('quantity', this.cartDataList[i].num);
          formData.append('price', this.cartDataList[i].export_price);
          this.DataserviceService.addOrderDetail(formData).subscribe((res: any) => {

          });
        }
      });
      this.toastr.success('Đặt Hàng Thành Công ');
      localStorage.removeItem('cart');
    }
  }
}

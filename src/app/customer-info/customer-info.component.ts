import { Component } from '@angular/core';
import { CartService } from '../dataservice/cart.service';
import { DataserviceService } from '../dataservice/dataservice.service';
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent {
  userName: any;
  email : any;
  phone: any;
  idCustomer: any;
  cartHitory: any;
  constructor(private cart: CartService,private DataserviceService: DataserviceService) { }
  ngOnInit(): void {
    const localData: any = localStorage.getItem('user');
    const localDataObj = JSON.parse(localData)
    this.idCustomer = localDataObj.id;
    this.userName = localDataObj.name;
    this.email = localDataObj.email;
    this.phone = localDataObj.phone;
    this.DataserviceService.getOrderByCustomerId(this.idCustomer).subscribe((data: any) => {
      this.cartHitory = data;
      console.log(data);
    });

  }

}

import { Router } from '@angular/router';
import { Customers } from './../class/customers';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenService } from '../dataservice/authen.service';
import { CartService } from '../dataservice/cart.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  customers = new Customers();
  constructor(
    private authen: AuthenService,
    private router: Router,
    ) { 
   }
  register(){
    this.authen.register(this.customers)
    if(this.customers){
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/register']);
    }
    this.router.navigate(['/login']);
  }
}

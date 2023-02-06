import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../dataservice/authen.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authen: AuthenService,
    private router: Router) { 
   }
  onSubmit(form : NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authen.login(email,password).subscribe((res :any)=>{
      localStorage.setItem('user', JSON.stringify(res));
      console.log(res);
      this.router.navigate(['/home']);
    }),(err: any)=>{
      this.router.navigate(['/login']);
    }
  }
  
}

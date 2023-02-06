import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
import { CartService } from '../dataservice/cart.service';
import { DataserviceService } from '../dataservice/dataservice.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: any;
  constructor( private activatedRoute: ActivatedRoute,
    private DataserviceService: DataserviceService,
    private cart: CartService,
    private toastr: ToastrService,) { }
  ngOnInit() {

    // this.activatedRoute.paramMap.subscribe(params => {
    //   console.log(params);
    //   const id = params.get('id');
    //   this.productService.findProductById(id).subscribe(
    //     product => this.product = product
    //   );
    // });
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.DataserviceService.getProductById(id))
    ).subscribe(product => this.product = product);
    console.log(this.product);
    // const paramMap = this.activatedRoute.snapshot.paramMap;
    // const id = paramMap.get('id');
    // this.productService.findProductById(id).subscribe(product => this.product = product);

  }
  addToCart(product: any) {
    this.cart.addProductToCart(product)
    this.toastr.success('Thêm vào giỏ hàng thành công');
  }
}

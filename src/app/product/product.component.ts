import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { map, switchMap } from 'rxjs';
import { CartService } from '../dataservice/cart.service';
import { DataserviceService } from '../dataservice/dataservice.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: any;
  term: any;
  cartDetail: any;
  productList: any;
  modalRef?: BsModalRef;
  page: number = 1;
  tablesize: number = 20;
  count: number = 0;
  tableSizes: any=[5,10,15,20,25];
  cartProductList: any;
  viewProduct:any;
  constructor(
    private cart: CartService,
    private activatedRoute: ActivatedRoute,
    private DataserviceService: DataserviceService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) {

  }
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
      switchMap(id => this.DataserviceService.getProductCategorybyId(id))
    ).subscribe(product => this.product = product);
    // const paramMap = this.activatedRoute.snapshot.paramMap;
    // const id = paramMap.get('id');
    // this.productService.findProductById(id).subscribe(product => this.product = product);

  }
  backToList() {
    this.router.navigate(['/home']);
  }
  addToCart(product: any) {
    this.cart.addProductToCart(product)
    this.toastr.success('Thêm vào giỏ hàng thành công');
  }
  onTableDataChange(event:any){
    this.page = event;
  }
  onTableSizeChange(event:any): void {
    this.tablesize = event.target.value;
    this.page = 1;
  }
  openModal(template: TemplateRef<any> , id : any) {
    this.modalRef = this.modalService.show(template);
    this.DataserviceService.getProductById(id).subscribe(res => {
      this.viewProduct = res;
      console.log(this.viewProduct);
    })
  }


}

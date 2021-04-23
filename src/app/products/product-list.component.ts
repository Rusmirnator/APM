import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list-component.html',
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    //NOTE: no need to specify data types, works somewhat like var in C# 
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;
    
    private _listFilter: string = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string){
      this._listFilter = value;
      console.log('In setter:', value);
      this.filteredProducts = this.performFilter(value);
    }
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

  //NOTE: Dependency Injection
  // private _productService;
  // constructor(productService: ProductService) {
  //   this._productService = productService; 
  //}
  
  //^^ this is classic way of declaring constructor for dependency injection, 
  // below shorthand version
  constructor(private productService: ProductService){}

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
        
    }
    ngOnDestroy() {
      this.sub.unsubscribe();
    }
    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLowerCase();
      return this.products.filter((product: IProduct)=> 
      product.productName.toLowerCase().includes(filterBy));
    }
    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }
}
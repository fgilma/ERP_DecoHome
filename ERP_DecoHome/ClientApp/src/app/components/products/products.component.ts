import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  p = 1;
  products: IProduct[];
  filteredProducts: IProduct[];
  error: string;
  category: string;

  // get set listFilter
  // tslint:disable-next-line: variable-name
   _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    // get products
    this.productService.getProducts().subscribe({
      next: response => {
        this.products = response;
        this.filteredProducts = this.products;
      },
      error: err => this.error = err
    });
  }

  createProduct(): void {
    this.router.navigate(['/createProduct']);

  }
 // delete product
  deleteProduct(id: number): void {
      if (confirm(`Really delete the product: ${id}?`)) {
        this.productService.deleteProduct(id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.error = err
          });
      }
  }

  onSaveComplete(): void {
   // update template after changes
    this.productService.getProducts().subscribe({
      next: response => {this.products = response;
                         this.filteredProducts = this.products;
      },
      error: err => this.error = err
    });
  }
  // show products with minimun stock
  getColor(i: number): string {
    return i > 10 ? 'black' : 'red';
 }
 // search product by category
 performFilter(filterBy: string): IProduct[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) =>
              product.category.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}

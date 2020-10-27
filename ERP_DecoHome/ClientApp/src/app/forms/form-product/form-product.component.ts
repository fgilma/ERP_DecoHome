import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../../interfaces/icategory';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  categories: string[];
  error: string;
  productForm: FormGroup;
  title: string;
  product: IProduct;

  constructor(// private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    // get categories
    this.productService.getCategories().subscribe({
      next: response => this.categories = response,
      error: err => this.error = err
    });
    // product form
    this.productForm = this.fb.group ({
      name: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      cost: ['', Validators.required],
      iva: ['21'],
      unitPvp: ['', Validators.required],
      unitPvpIva: ['', Validators.required]
    });

    // Read the product Id from the route parameter
    const id = +this.route.snapshot.paramMap.get('id');
    if (id === 0) {
      this.title = 'Crear ';
    } else {
      this.title = 'Editar ';
      this.productService.getProductById(id).subscribe({
            next: (response: IProduct) => {
                      this.product = response;
                      // Update the data on the form
                      this.productForm.patchValue({
                          name: this.product.name,
                          category: this.product.category,
                          amount: this.product.amount,
                          cost: this.product.cost,
                          unitPvp: this.product.unitPvp,
                          unitPvpIva: this.product.unitPvpIva
                    });
            },
            error: err => this.error = err
          });
    }
  }
  saveProduct(): void {
    const p = { ...this.product, ...this.productForm.value };
    const id = +this.route.snapshot.paramMap.get('id');
    if (id === 0) {
      this.productService.createProduct(p)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.error = err
        });
    } else {
      this.productService.updateProduct(p)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.error = err
        });
      }
    }
    onSaveComplete(): void {
      // Reset the form to clear the flags
      this.productForm.reset();
      this.router.navigate(['/products']);
    }

}

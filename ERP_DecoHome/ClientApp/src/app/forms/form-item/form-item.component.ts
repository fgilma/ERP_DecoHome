import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ItemsOrderService } from '../../services/items-order.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ICategory } from '../../interfaces/icategory';
import { IProduct } from '../../interfaces/iproduct';
import { IOrderItem } from '../../interfaces/iorder-item';
import { IOrder } from '../../interfaces/iorder';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit {
  categories: ICategory[];
  products: IProduct[];
  error: string;
  itemForm: FormGroup;
  orderId: number;
  title: string;
  isNew: boolean;
  category: string;
  productId: number;
  item: IOrderItem;
  order: IOrder;
  newItems = [];
  totalCost = 0;
  totalPvp = 0;
  totalPvpIva = 0;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private itemsOrderService: ItemsOrderService,
              private categoryService: CategoryService,
              private productService: ProductService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    // Get categories to search items
    this.categoryService.getCategories().subscribe({
      next: (response: ICategory[]) => this.categories = response,
      error: err => this.error = err
    });

    // Get products to select items
    this.productService.getProducts().subscribe({
      next: (response: IProduct[]) => this.products = response,
      error: err => this.error = err
    });

    // Form to create items
    this.itemForm = this.fb.group ({
      name: [''],
      amount: ['', Validators.required],
      category: [''],
      categoryId: [''],
      productId: ['', Validators.required]
    });

    // Read the product Id from the route parameter
    const id = +this.route.snapshot.paramMap.get('id');
    this.orderId = +this.route.snapshot.paramMap.get('orderId');

    if (id === 0) {
      // new item
      this.title = 'Comprar';
      this.isNew = true;
      // Get values for category and productId to select new item
      this.itemForm.get('category').valueChanges.subscribe(value => this.category = value);
      this.itemForm.get('productId').valueChanges.subscribe(value => this.productId = value);

    } else {
      // edit item
      this.title = 'Editar';
      // Get values for category and productId to select new item
      this.itemForm.get('category').valueChanges.subscribe(value => this.category = value);
      this.itemForm.get('productId').valueChanges.subscribe(value => this.productId = value);
      this.isNew = false;
      this.itemsOrderService.getItemsOrderById(id).subscribe({
        next: (response: IOrderItem) => {
                                          this.item = response;
                                          console.log(this.item.product.name);
                                          // Show data item on the form to edit
                                          this.itemForm.patchValue({
                                                productId: this.item.product.id,
                                                amount: this.item.amount,
                                                category: this.item.product.category.name
                                          });
                                        },
        error: err => this.error = err
      });
    }
  }

// add items to cart and edit items
  addEditItem(): void {
    const p = { ...this.item, ...this.itemForm.value };
    // get the orderId from route
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    // get the id item
    const id = +this.route.snapshot.paramMap.get('id');
    // add list of cart
    if (id === 0) {
      // get data from product: cost,pvp, pvp+iva
      this.productService.getProductById(p.productId).subscribe({
        next: (response: IProduct) => {
                    // calculate costs, pvps * units
                    p.totalCost = (response.cost * p.amount).toFixed(2);
                    p.totalPvp = (response.unitPvp * p.amount).toFixed(2);
                    p.totalPvpIva = (response.unitPvpIva * p.amount).toFixed(2);
                    // set  name and unitPvp
                    p.unitPvp = response.unitPvp;
                    p.name = response.name;
                    p.orderId = orderId;
                    // add item in cart list
                    this.newItems.push(p);
                    console.log(this.newItems);
                    // update totals
                    this.totalCost += +p.totalCost;
                    this.totalPvp += +p.totalPvp;
                    this.totalPvpIva += +p.totalPvpIva;
                    this.itemForm.reset();
                  },
      error: err => this.error = err
      });
    // edit and update item
    } else {
      this.productService.getProductById(p.productId).subscribe({
        next: (response: IProduct) => {
                    p.totalCost = (response.cost * p.amount).toFixed(2);
                    p.totalPvp = (response.unitPvp * p.amount).toFixed(2);
                    p.totalPvpIva = (response.unitPvpIva * p.amount).toFixed(2);
                    p.productId = response.id;
                    this.itemsOrderService.updateItemsOrder(p).subscribe({
                                              next: () => this.updateOrder(),
                                              error: err => this.error = err
                                            });
                    },
        error: err => this.error = err
      });
    }
 }

  // update order after editing item
  updateOrder(): void {
    // Get order item belongs
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    this.orderService.getOrderById(orderId).subscribe({
                    next: (response: IOrder) => this.order = response,
                    error: err => this.error = err
              });
    // Update total values of order
    this.itemsOrderService.getTotal(orderId).subscribe({
      next: (response2: number[]) => {
        this.order.totalCost = response2[0];
        this.order.totalPvp = response2[1];
        this.order.totalPvpIva = response2[2];
        this.orderService.updateOrder(this.order).subscribe({
                              next: () => {
            return this.onSaveComplete();
          },
                              error: err => this.error = err

                      });
        }
    });
  }

// create items and update new order with totals
saveCart(): void{
  // post items from cart on database
  for (const i of this.newItems){
    this.itemsOrderService.createItemsOrder(i).subscribe({
         next: response => console.log(response),
        error: err => this.error = err
      });
   }
   // update new order with totals
  const orderId = +this.route.snapshot.paramMap.get('orderId');
  this.orderService.getOrderById(orderId).subscribe({
          next: (response: IOrder) => {
                  this.order = response;
                  this.order.totalCost = this.totalCost;
                  this.order.totalPvp = this.totalPvp;
                  this.order.totalPvpIva = this.totalPvpIva;
                  this.orderService.updateOrder(this.order).subscribe({
                          next: (response3) => console.log('que saldra', response3),
                          error: err => this.error = err
                        });
          },
          error: err => this.error = err
  });
  this.onSaveComplete();
}

// delete item from cart list
deleteItem(id: number): void{
  if (confirm(`Really delete the product: ${id + 1}?`)) {
    this.newItems.splice(id, 1);
  }
}

onSaveComplete(): void {
  // Reset the form to clear the flags
  const id = +this.route.snapshot.paramMap.get('id');
  const orderId = +this.route.snapshot.paramMap.get('orderId');
  if (id === 0) {
    this.itemForm.reset();
    this.onBack();
  }
  else {
    this.router.navigate(['/itemsOrder', 'order', orderId]);
  }

}
onBack(): void{
    const optionRoute = this.route.snapshot.paramMap.get('option');
    const option1 = this.route.snapshot.paramMap.get('option1');
    const orderId = +this.route.snapshot.paramMap.get('orderId');
    if (optionRoute === 'order'){
      this.router.navigate(['/itemsOrder', 'order', orderId]);
    }
    else if (optionRoute === 'customer'){

      this.router.navigate(['/itemsOrder', 'customer', option1, orderId]);
    }
    else if (optionRoute === 'employee'){
      this.router.navigate(['/itemsOrder', 'employee', option1, orderId]);
    }
  }

}





